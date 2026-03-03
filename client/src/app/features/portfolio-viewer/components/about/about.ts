import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {
  portfolioData: PortfolioData | null = null;
  private subscription: Subscription | null = null;
  apiUrl = environment.apiUrl;

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

  getProfileImageUrl(): string | null {
    if (this.user?.profilePicture && this.user.profilePicture !== 'default-profile.png') {
      if (this.user.profilePicture.startsWith('http')) return this.user.profilePicture;
      return `${this.apiUrl}/${this.user.profilePicture}`;
    }
    return null;
  }

  getUserInitials(): string {
    const first = this.user?.firstName?.charAt(0)?.toUpperCase() || '';
    const last = this.user?.lastName?.charAt(0)?.toUpperCase() || '';
    return first + last || '?';
  }
}
