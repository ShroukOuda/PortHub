import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { IUser } from '../../../core/models/iuser';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayoutComponent implements OnInit {
  private authState = inject(AuthStateService);

  currentUser = signal<IUser | null>(null);
  sidebarCollapsed = signal(false);
  mobileMenuOpen = signal(false);

  menuItems = [
    { icon: 'layout-dashboard', label: 'Dashboard', route: '/admin' },
    { icon: 'users', label: 'Users', route: '/admin/users' },
    { icon: 'briefcase', label: 'Portfolios', route: '/admin/portfolios' },
    { icon: 'wrench', label: 'Skills', route: '/admin/skills' },
  ];

  ngOnInit() {
    this.authState.currentUser$.subscribe(user => {
      this.currentUser.set(user);
    });
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
