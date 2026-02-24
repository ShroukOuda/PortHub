import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { AdminService, AdminStats } from '../../../core/services/admin.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './admin-overview.html',
  styleUrl: './admin-overview.css'
})
export class AdminOverviewComponent implements OnInit {
  private adminService = inject(AdminService);

  loading = signal(true);
  stats = signal<AdminStats>({
    totalUsers: 0,
    totalPortfolios: 0,
    totalProjects: 0,
    totalSkills: 0,
    totalViews: 0,
    usersThisMonth: 0,
    portfoliosThisMonth: 0,
    recentUsers: [],
    recentPortfolios: [],
    topPortfolios: [],
    userGrowthData: [],
    portfolioGrowthData: [],
    platformViewHistory: [],
    totalCountries: 0,
    countryCounts: []
  });

  // User & Portfolio Growth Chart (Bar)
  growthChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  growthChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#a0a0b0' } }
    },
    scales: {
      x: { ticks: { color: '#a0a0b0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#a0a0b0' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
    }
  };

  // Platform Views Chart (Line)
  viewsChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  viewsChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#a0a0b0' } }
    },
    scales: {
      x: { ticks: { color: '#a0a0b0', maxTicksLimit: 10 }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#a0a0b0' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
    }
  };

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading.set(true);
    this.adminService.getStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
        this.buildCharts(stats);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private buildCharts(stats: AdminStats) {
    // Growth chart
    const months = stats.userGrowthData.map(d => {
      const [y, m] = d.month.split('-');
      return new Date(+y, +m - 1).toLocaleString('default', { month: 'short' });
    });

    this.growthChartData = {
      labels: months,
      datasets: [
        {
          label: 'New Users',
          data: stats.userGrowthData.map(d => d.count),
          backgroundColor: 'rgba(231, 76, 60, 0.7)',
          borderRadius: 6
        },
        {
          label: 'New Portfolios',
          data: stats.portfolioGrowthData.map(d => d.count),
          backgroundColor: 'rgba(52, 152, 219, 0.7)',
          borderRadius: 6
        }
      ]
    };

    // Platform views chart
    const viewDates = stats.platformViewHistory.map(d => {
      const date = new Date(d.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    this.viewsChartData = {
      labels: viewDates,
      datasets: [{
        label: 'Portfolio Views',
        data: stats.platformViewHistory.map(d => d.count),
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }]
    };
  }
}
