import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { IUser } from '../../../core/models/iuser';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsersComponent implements OnInit {
  private adminService = inject(AdminService);

  loading = signal(true);
  users = signal<IUser[]>([]);
  filteredUsers = signal<IUser[]>([]);
  searchQuery = signal('');
  roleFilter = signal('all');
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.adminService.getUsers().subscribe({
      next: (response) => {
        this.users.set(response.data);
        this.applyFilters();
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  applyFilters() {
    let filtered = this.users();

    // Search filter
    const query = this.searchQuery().toLowerCase();
    if (query) {
      filtered = filtered.filter(u => 
        u.firstName?.toLowerCase().includes(query) ||
        u.lastName?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query) ||
        u.username?.toLowerCase().includes(query)
      );
    }

    // Role filter
    if (this.roleFilter() !== 'all') {
      filtered = filtered.filter(u => u.role === this.roleFilter());
    }

    this.filteredUsers.set(filtered);
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  onRoleFilter(role: string) {
    this.roleFilter.set(role);
    this.applyFilters();
  }

  toggleUserStatus(user: IUser) {
    this.adminService.toggleUserStatus(user._id!).subscribe({
      next: (updated) => {
        this.users.update(list => list.map(u => u._id === updated._id ? updated : u));
        this.applyFilters();
        this.message.set({ type: 'success', text: `User ${updated.isActive ? 'activated' : 'deactivated'}` });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Failed to update user status' })
    });
  }

  deleteUser(user: IUser) {
    if (!confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`)) {
      return;
    }

    this.adminService.deleteUser(user._id!).subscribe({
      next: () => {
        this.users.update(list => list.filter(u => u._id !== user._id));
        this.applyFilters();
        this.message.set({ type: 'success', text: 'User deleted successfully' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Failed to delete user' })
    });
  }

  changeRole(user: IUser, role: string) {
    if (user.role === role) return;
    
    this.adminService.changeUserRole(user._id!, role).subscribe({
      next: (updated) => {
        this.users.update(list => list.map(u => u._id === updated._id ? updated : u));
        this.applyFilters();
        this.message.set({ type: 'success', text: `User role changed to ${role}` });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Failed to change user role' })
    });
  }

  getUserInitials(user: IUser): string {
    return (user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '');
  }

  getAdminCount(): number {
    return this.users().filter(u => u.role === 'admin').length;
  }
}
