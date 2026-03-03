import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { Iproject } from '../../../../core/models/iproject';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit, OnDestroy {
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

  get projects(): Iproject[] {
    return this.portfolioData?.projects || [];
  }

  hasProjectImage(project: Iproject): boolean {
    return !!project.image && project.image !== 'default-project-image.png';
  }

  getProjectImageUrl(project: Iproject): string {
    const img = project.image || '';
    if (!img || img === 'default-project-image.png') return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${environment.apiUrl}/${img}`;
  }
}


