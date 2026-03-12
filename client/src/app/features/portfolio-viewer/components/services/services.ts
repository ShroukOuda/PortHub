import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { Iservice } from '../../../../core/models/iservice';


@Component({
  selector: 'app-services',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Services implements OnInit, OnDestroy {  
  portfolioData: PortfolioData | null = null;
  private subscription: Subscription | null = null;

  constructor(private portfolioDataService: PortfolioDataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscription = this.portfolioDataService.portfolioData$.subscribe(data => {
      this.portfolioData = data;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get isLoading(): boolean {
    return this.portfolioData?.loading ?? true;
  }

  get services(): Iservice[] {
    return this.portfolioData?.services || [];
  }

}
