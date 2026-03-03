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
  searchQuery = signal('');
  roleFilter = signal('all');
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalUsers = signal(0);
  totalPages = signal(0);

  private searchTimeout: any;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    const params: any = {
      page: this.currentPage(),
      limit: this.pageSize()
    };
    const query = this.searchQuery().trim();
    if (query) params.search = query;
    if (this.roleFilter() !== 'all') params.role = this.roleFilter();

    this.adminService.getUsers(params).subscribe({
      next: (response) => {
        this.users.set(response.data);
        this.totalUsers.set(response.pagination.total);
        this.totalPages.set(response.pagination.pages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.currentPage.set(1);
      this.loadUsers();
    }, 400);
  }

  onRoleFilter(role: string) {
    this.roleFilter.set(role);
    this.currentPage.set(1);
    this.loadUsers();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadUsers();
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    const maxVisible = 5;

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(1, current - 2);
      let end = Math.min(total, start + maxVisible - 1);
      if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  }

  toggleUserStatus(user: IUser) {
    this.adminService.toggleUserStatus(user._id!).subscribe({
      next: (updated) => {
        this.users.update(list => list.map(u => u._id === updated._id ? updated : u));
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
        this.loadUsers();
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
