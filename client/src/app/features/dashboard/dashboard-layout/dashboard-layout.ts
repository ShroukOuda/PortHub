import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { IUser } from '../../../core/models/iuser';
import { IPortfolio } from '../../../core/models/iportfolio';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayoutComponent implements OnInit {
  private authState = inject(AuthStateService);
  private portfolioService = inject(DashboardPortfolioService);

  currentUser = signal<IUser | null>(null);
  portfolio = signal<IPortfolio | null>(null);
  sidebarCollapsed = signal(false);
  mobileMenuOpen = signal(false);

  menuItems = [
    { icon: 'house', label: 'Overview', route: '/dashboard' },
    { icon: 'user-cog', label: 'Profile Settings', route: '/dashboard/profile' },
    { icon: 'palette', label: 'Portfolio Settings', route: '/dashboard/portfolio' },
    { icon: 'paintbrush', label: 'Theme & Colors', route: '/dashboard/theme' },
    { icon: 'code', label: 'Projects', route: '/dashboard/projects' },
    { icon: 'wrench', label: 'Skills', route: '/dashboard/skills' },
    { icon: 'briefcase', label: 'Services', route: '/dashboard/services' },
    { icon: 'graduation-cap', label: 'Education', route: '/dashboard/education' },
    { icon: 'building-2', label: 'Experience', route: '/dashboard/experience' },
    { icon: 'award', label: 'Certificates', route: '/dashboard/certificates' },
    { icon: 'quote', label: 'Testimonials', route: '/dashboard/testimonials' },
  ];

  ngOnInit() {
    this.authState.currentUser$.subscribe(user => {
      this.currentUser.set(user);
    });

    this.portfolioService.myPortfolio$.subscribe(portfolio => {
      this.portfolio.set(portfolio);
    });

    this.portfolioService.getMyPortfolio().subscribe();
  }

  toggleSidebar() {
    this.sidebarCollapsed.update(v => !v);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  logout() {
    this.authState.logout();
  }
}
