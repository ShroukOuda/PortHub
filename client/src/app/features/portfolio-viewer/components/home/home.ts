import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  portfolioData: PortfolioData | null = null;
  private subscription: Subscription | null = null;

  constructor(private portfolioDataService: PortfolioDataService) {}

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

  get portfolio() {
    return this.portfolioData?.portfolio;
  }

  getCvUrl(): string {
    const url = this.portfolio?.cvUrl || '';
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${environment.apiUrl}/${url}`;
  }
}
