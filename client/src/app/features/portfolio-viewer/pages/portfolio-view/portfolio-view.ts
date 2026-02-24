import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Header } from '../../components/header/header';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { PortfolioService } from '../../../../core/services/portfolio/portfolio-service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio-view',
  imports: [Header, RouterOutlet, CommonModule, RouterLink],
  templateUrl: './portfolio-view.html',
  styleUrls: ['./portfolio-view.css']
})
export class PortfolioView implements OnInit, OnDestroy {
  portfolioData: PortfolioData | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private portfolioDataService: PortfolioDataService,
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId) {
      this.loadPortfolio(userId);
    }
  }

  loadPortfolio(userId: string): void {
    this.subscription = this.portfolioDataService.loadPortfolioData(userId).subscribe({
      next: (data) => {
        this.portfolioData = data;
        // Track view
        if (data.portfolio?._id) {
          this.portfolioService.trackView(data.portfolio._id).subscribe();
        }
        // Apply theme
        if (data.portfolio?.theme) {
          this.applyTheme(data.portfolio.theme);
        }
      },
      error: (error) => {
        console.error('Error loading portfolio:', error);
        if (error?.error?.message === 'This portfolio is private') {
          this.portfolioData = {
            user: null,
            portfolio: null,
            projects: [],
            skills: [],
            services: [],
            educations: [],
            experiences: [],
            testimonials: [],
            certificates: [],
            loading: false,
            error: 'This portfolio is private and can only be viewed by its owner.'
          };
        }
      }
    });
  }

  private applyTheme(theme: any): void {
    const root = this.document.documentElement;
    
    // Map theme properties to CSS variables used by portfolio-viewer components
    if (theme.primaryColor) {
      root.style.setProperty('--primary-color', theme.primaryColor);
      root.style.setProperty('--main-color', theme.primaryColor);
    }
    if (theme.secondaryColor) {
      root.style.setProperty('--secondary-color', theme.secondaryColor);
      root.style.setProperty('--hover-color', theme.secondaryColor);
    }
    if (theme.accentColor) {
      root.style.setProperty('--accent-color', theme.accentColor);
    }
    if (theme.backgroundColor) {
      root.style.setProperty('--background-color', theme.backgroundColor);
    }
    if (theme.textColor) {
      root.style.setProperty('--text-color', theme.textColor);
      root.style.setProperty('--button-text-color', theme.textColor);
    }
    if (theme.cardBackground) {
      root.style.setProperty('--card-background', theme.cardBackground);
      root.style.setProperty('--card-bg', theme.cardBackground);
    }
    if (theme.fontFamily) {
      root.style.setProperty('--font-family', theme.fontFamily);
      root.style.fontFamily = theme.fontFamily;
    }
  }

  private resetTheme(): void {
    const root = this.document.documentElement;
    root.style.removeProperty('--primary-color');
    root.style.removeProperty('--main-color');
    root.style.removeProperty('--secondary-color');
    root.style.removeProperty('--hover-color');
    root.style.removeProperty('--accent-color');
    root.style.removeProperty('--background-color');
    root.style.removeProperty('--text-color');
    root.style.removeProperty('--button-text-color');
    root.style.removeProperty('--card-background');
    root.style.removeProperty('--card-bg');
    root.style.removeProperty('--font-family');
    root.style.fontFamily = '';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.portfolioDataService.clearData();
    this.resetTheme();
  }
}
