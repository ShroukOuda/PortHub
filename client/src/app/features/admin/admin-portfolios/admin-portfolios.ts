import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { IPortfolio } from '../../../core/models/iportfolio';

@Component({
  selector: 'app-admin-portfolios',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
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
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  onVisibilityFilter(visibility: string) {
    this.visibilityFilter.set(visibility);
    this.applyFilters();
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
