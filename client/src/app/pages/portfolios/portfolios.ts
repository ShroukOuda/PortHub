import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iuser } from '../../core/models/iuser';
import { UserService } from '../../core/services/user-service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-portfolios',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './portfolios.html',
  styleUrl: './portfolios.css'
})
export class Portfolios implements OnInit {
  users = signal<Iuser[]>([]);
  filteredUsers = signal<Iuser[]>([]);
  isLoading = signal(true);
  searchQuery = signal('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getPublicUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.filteredUsers.set(users);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading.set(false);
      }
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery.set(query);
    if (!query) {
      this.filteredUsers.set(this.users());
    } else {
      this.filteredUsers.set(
        this.users().filter(u =>
          (u.firstName + ' ' + (u.lastName || '')).toLowerCase().includes(query) ||
          (u.jobTitle || '').toLowerCase().includes(query) ||
          (u.username || '').toLowerCase().includes(query)
        )
      );
    }
  }

  onImageError(event: Event): void {
    (event.target as HTMLElement).style.display = 'none';
  }

  getInitials(user: Iuser): string {
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  }
}