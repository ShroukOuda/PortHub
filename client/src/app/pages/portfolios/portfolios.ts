import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iuser } from '../../core/models/iuser';
import { UserService } from '../../core/services/user-service';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-portfolios',
  imports: [LucideAngularModule, RouterLink, ScrollRevealDirective],
  templateUrl: './portfolios.html',
  styleUrl: './portfolios.css'
})
export class Portfolios implements OnInit {
  users = signal<Iuser[]>([]);
  filteredUsers = signal<Iuser[]>([]);
  isLoading = signal(true);
  searchQuery = signal('');

  // Pagination
  currentPage = signal(1);
  itemsPerPage = signal(12);

  totalPages = computed(() => Math.ceil(this.filteredUsers().length / this.itemsPerPage()));

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredUsers().slice(start, start + this.itemsPerPage());
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < total - 2) pages.push('...');
      pages.push(total);
    }
    return pages;
  });

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
    this.currentPage.set(1);
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

  goToPage(page: number | string): void {
    if (typeof page === 'string') return;
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 300, behavior: 'smooth' });
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