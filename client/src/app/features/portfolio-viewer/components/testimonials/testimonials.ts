import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { Itestimonial } from '../../../../core/models/itestimonial';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials implements OnInit, OnDestroy {
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

  get testimonials(): Itestimonial[] {
    return this.portfolioData?.testimonials || [];
  }

  getStars(rating: number = 5): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  getAuthorImageUrl(testimonial: Itestimonial): string {
    const img = testimonial.authorImage || '';
    if (!img || img === 'default-author-image.png') return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${environment.apiUrl}/${img}`;
  }

  hasAuthorImage(testimonial: Itestimonial): boolean {
    return !!this.getAuthorImageUrl(testimonial);
  }
}
