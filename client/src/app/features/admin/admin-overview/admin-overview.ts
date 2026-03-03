import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { AdminService, AdminStats } from '../../../core/services/admin.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { environment } from '../../../../environments/environment';

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
  private apiUrl = environment.apiUrl;

  loading = signal(true);
  stats = signal<AdminStats>({
    totalUsers: 0,
    totalPortfolios: 0,
    totalProjects: 0,
    totalSkills: 0,
    totalViews: 0,
    usersThisMonth: 0,
    portfoliosThisMonth: 0,
    publicPortfolioCount: 0,
    privatePortfolioCount: 0,
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

  // Country Distribution Chart (Doughnut)
  countryChartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  countryChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: '#a0a0b0', padding: 12, font: { size: 11 } } }
    }
  };

  // Users vs Admins Chart (Pie)
  roleChartData: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  roleChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#a0a0b0', padding: 16, font: { size: 12 } } }
    }
  };

  // Portfolio Visibility Chart (Doughnut)
  visibilityChartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  visibilityChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#a0a0b0', padding: 16, font: { size: 12 } } }
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

    // Country distribution chart (top 8 + Others)
    const countryColors = [
      '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6',
      '#1abc9c', '#e67e22', '#34495e', '#95a5a6'
    ];
    const topCountries = stats.countryCounts.slice(0, 8);
    const othersCount = stats.countryCounts.slice(8).reduce((sum, c) => sum + c.count, 0);
    const countryLabels = topCountries.map(c => c.country);
    const countryData = topCountries.map(c => c.count);
    if (othersCount > 0) {
      countryLabels.push('Others');
      countryData.push(othersCount);
    }
    this.countryChartData = {
      labels: countryLabels,
      datasets: [{
        data: countryData,
        backgroundColor: countryColors.slice(0, countryLabels.length),
        borderWidth: 0,
        hoverOffset: 8
      }]
    };

    // Users vs Admins pie chart
    const adminCount = (stats as any).adminCount || 0;
    const userCount = stats.totalUsers - adminCount;
    this.roleChartData = {
      labels: ['Users', 'Admins'],
      datasets: [{
        data: [userCount, adminCount],
        backgroundColor: ['#3498db', '#e74c3c'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    };

    // Portfolio Visibility doughnut chart
    const publicCount = stats.publicPortfolioCount || 0;
    const privateCount = stats.privatePortfolioCount || 0;
    this.visibilityChartData = {
      labels: ['Public', 'Private'],
      datasets: [{
        data: [publicCount, privateCount],
        backgroundColor: ['#2ecc71', '#f1c40f'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    };
  }

  getAdminProfileUrl(user: any): string | null {
    const pic = user?.profilePicture || user?.profileImage;
    if (!pic || pic === 'default-profile.png') return null;
    if (pic.startsWith('http')) return pic;
    return `${this.apiUrl}/${pic}`;
  }
}
