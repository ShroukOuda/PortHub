import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { environment } from '../../../../../environments/environment';
import { Iuser } from '../../../../core/models/iuser';
import { AuthState } from '../../../../core/services/auth-state';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit, OnDestroy {
  portfolioData: PortfolioData | null = null;
  currentUser: Iuser | null = null;
  private subscription: Subscription | null = null;
  apiUrl = environment.apiUrl;

  constructor(private portfolioDataService: PortfolioDataService, private authState: AuthState) {}

  ngOnInit(): void {
   
    this.subscription = this.portfolioDataService.portfolioData$.subscribe(data => {
        this.portfolioData = data;
      });
    
    this.authState.currentUser$.subscribe(user => {
      this.currentUser = user;
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
    const pic = this.currentUser?.profilePicture || this.currentUser?.profileImage;
    if (!pic || pic === 'default-profile.png') return null;
    if (pic.startsWith('http')) return pic;
    return `${this.apiUrl}/${pic}`;
  }
   
  getUserInitials(): string {
    const first = this.currentUser?.firstName?.charAt(0)?.toUpperCase() || '';
    const last = this.currentUser?.lastName?.charAt(0)?.toUpperCase() || '';
    return first + last || '?';
  }
}
