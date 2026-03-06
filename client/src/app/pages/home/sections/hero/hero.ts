import { Component, OnInit, OnDestroy, inject, signal, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from 'app/core/services/auth-service';
import { UserService } from 'app/core/services/user-service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  totalUsers = signal(0);
  totalPortfolios = signal(0);
  totalCountries = signal(0);

  displayUsers = signal(0);
  displayPortfolios = signal(0);
  displayCountries = signal(0);
  private counterInterval: any;

  ngOnInit(): void {
    this.userService.getStats().subscribe({
      next: (stats) => {
        this.totalUsers.set(stats.totalUsers);
        this.totalPortfolios.set(stats.totalPortfolios);
        this.totalCountries.set(stats.totalCountries);
        this.animateCounters(stats);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.createParticles();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.counterInterval);
  }

  private animateCounters(stats: any) {
    if (!isPlatformBrowser(this.platformId)) {
      this.displayUsers.set(stats.totalUsers);
      this.displayPortfolios.set(stats.totalPortfolios);
      this.displayCountries.set(stats.totalCountries);
      return;
    }
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    this.counterInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      this.displayUsers.set(Math.round(stats.totalUsers * eased));
      this.displayPortfolios.set(Math.round(stats.totalPortfolios * eased));
      this.displayCountries.set(Math.round(stats.totalCountries * eased));

      if (step >= steps) clearInterval(this.counterInterval);
    }, interval);
  }

  private createParticles() {
    const container = this.el.nativeElement.querySelector('.hero-particles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }
  }

  navigateToPortfolio() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard/portfolio']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
