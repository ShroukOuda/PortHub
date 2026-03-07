import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';
import { AdminService } from '../../../core/services/admin.service';
import { IPortfolio } from '../../../core/models/iportfolio';

@Component({
  selector: 'app-admin-portfolios',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: './admin-portfolios.html',
  styleUrl: './admin-portfolios.css'
})
export class AdminPortfoliosComponent implements OnInit {
  private adminService = inject(AdminService);

  loading = signal(true);
  portfolios = signal<IPortfolio[]>([]);
  filteredPortfolios = signal<IPortfolio[]>([]);
  searchQuery = signal('');
  visibilityFilter = signal('all');
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pagination
  currentPage = signal(1);
  itemsPerPage = signal(12);
  totalItems = signal(0);

  totalPages = computed(() => Math.ceil(this.filteredPortfolios().length / this.itemsPerPage()));
  
  paginatedPortfolios = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.filteredPortfolios().slice(start, end);
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

  ngOnInit() {
    this.loadPortfolios();
  }

  loadPortfolios() {
    this.loading.set(true);
    this.adminService.getPortfolios({ limit: 10000 }).subscribe({
      next: (response) => {
        this.portfolios.set(response.data);
        this.applyFilters();
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  applyFilters() {
    let filtered = this.portfolios();

    // Search filter
    const query = this.searchQuery().toLowerCase();
    if (query) {
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(query) ||
        p.About?.toLowerCase().includes(query)
      );
    }

    // Visibility filter
    if (this.visibilityFilter() === 'public') {
      filtered = filtered.filter(p => p.isPublic !== false);
    } else if (this.visibilityFilter() === 'private') {
      filtered = filtered.filter(p => p.isPublic === false);
    }

    this.filteredPortfolios.set(filtered);
    this.currentPage.set(1);
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  onVisibilityFilter(visibility: string) {
    this.visibilityFilter.set(visibility);
    this.applyFilters();
  }

  goToPage(page: number | string) {
    if (typeof page === 'string') return;
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  deletePortfolio(portfolio: IPortfolio) {
    if (!confirm(`Are you sure you want to delete "${portfolio.title || 'Untitled'}"? This action cannot be undone.`)) {
      return;
    }

    this.adminService.deletePortfolio(portfolio._id!).subscribe({
      next: () => {
        this.portfolios.update(list => list.filter(p => p._id !== portfolio._id));
        this.applyFilters();
        this.message.set({ type: 'success', text: 'Portfolio deleted successfully' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Failed to delete portfolio' })
    });
  }

  viewPortfolio(portfolio: IPortfolio) {
    const userId = portfolio.userId?._id || portfolio.userId;
    window.open(`/portfolio-view/${userId}`, '_blank');
  }

  getPublicCount(): number {
    return this.portfolios().filter(p => p.isPublic !== false).length;
  }

  getPrivateCount(): number {
    return this.portfolios().filter(p => p.isPublic === false).length;
  }
}
