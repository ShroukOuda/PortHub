import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  portfolioData: PortfolioData | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private portfolioDataService: PortfolioDataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.portfolioDataService.portfolioData$.subscribe(data => {
      this.portfolioData = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get user() {
    return this.portfolioData?.user;
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
  
  hoverContact = false;
  menuOpen = false;

  navLinks = [
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'About' },
    { path: 'education', label: 'Education' },
    { path: 'skills', label: 'Skills' },
    { path: 'experience', label: 'Experiences' },
    { path: 'services', label: 'Services' },
    { path: 'projects', label: 'Projects' },
    { path: 'certificates', label: 'Certificates' },
    { path: 'testimonials', label: 'Testimonials' },
  ];
}
