import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, BaseChartDirective],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css'
})
export class DashboardOverviewComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);
  private authState = inject(AuthStateService);

  loading = signal(true);
  currentUser = this.authState.currentUser$;

  stats = signal({
    projects: 0,
    skills: 0,
    services: 0,
    education: 0,
    experience: 0,
    certificates: 0,
    testimonials: 0
  });

  hasPortfolio = signal(false);
  portfolioViews = signal(0);

  quickActions = [
    { icon: 'plus', label: 'Add Project', route: '/dashboard/projects', color: '#91729c' },
    { icon: 'wrench', label: 'Add Skill', route: '/dashboard/skills', color: '#0077b6' },
    { icon: 'palette', label: 'Customize Theme', route: '/dashboard/theme', color: '#e76f51' },
    { icon: 'eye', label: 'Preview Portfolio', route: '', color: '#2d6a4f', external: true },
  ];

  // View History Line Chart
  viewsChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  viewsChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { ticks: { color: '#a0a0b0', maxTicksLimit: 10 }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#a0a0b0' }, grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
    }
  };

  // Content Distribution Doughnut Chart
  contentChartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  contentChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#a0a0b0', padding: 16, usePointStyle: true, pointStyleWidth: 10, font: { size: 12 } }
      }
    },
    cutout: '60%'
  };

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading.set(true);
    this.portfolioService.loadAllMyData().subscribe({
      next: (data) => {
        this.hasPortfolio.set(!!data.portfolio);
        this.stats.set({
          projects: data.projects?.length || 0,
          skills: data.skills?.length || 0,
          services: data.services?.length || 0,
          education: data.education?.length || 0,
          experience: data.experience?.length || 0,
          certificates: data.certificates?.length || 0,
          testimonials: data.testimonials?.length || 0
        });
        this.loading.set(false);

        // Load chart stats if portfolio exists
        if (data.portfolio) {
          this.loadChartStats();
        }
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private loadChartStats() {
    this.portfolioService.getMyPortfolioStats().subscribe({
      next: (res: any) => {
        const data = res.data || res;
        this.portfolioViews.set(data.totalViews || 0);
        this.buildViewsChart(data.viewHistory || []);
        this.buildContentChart(data.contentDistribution || {});
      },
      error: () => {}
    });
  }

  private buildViewsChart(viewHistory: { date: string; count: number }[]) {
    const labels = viewHistory.map(d => {
      const date = new Date(d.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    this.viewsChartData = {
      labels,
      datasets: [{
        label: 'Views',
        data: viewHistory.map(d => d.count),
        borderColor: '#91729c',
        backgroundColor: 'rgba(145, 114, 156, 0.15)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: '#91729c'
      }]
    };
  }

  private buildContentChart(dist: Record<string, number>) {
    const items = [
      { label: 'Projects', key: 'projects', color: '#91729c' },
      { label: 'Skills', key: 'skills', color: '#0077b6' },
      { label: 'Services', key: 'services', color: '#e76f51' },
      { label: 'Education', key: 'education', color: '#52b788' },
      { label: 'Experience', key: 'experience', color: '#f4a261' },
      { label: 'Certificates', key: 'certificates', color: '#e9c46a' },
      { label: 'Testimonials', key: 'testimonials', color: '#b76e79' }
    ].filter(i => (dist[i.key] || 0) > 0);

    this.contentChartData = {
      labels: items.map(i => i.label),
      datasets: [{
        data: items.map(i => dist[i.key] || 0),
        backgroundColor: items.map(i => i.color),
        borderColor: '#1a1a2e',
        borderWidth: 2
      }]
    };
  }
}
