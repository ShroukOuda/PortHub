import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { Iskill } from '../../../../core/models/iskill';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skills implements OnInit, OnDestroy {
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

  get skills(): Iskill[] {
    return this.portfolioData?.skills || [];
  }

  get categorizedSkills(): { category: string; skills: Iskill[] }[] {
    const groups: Record<string, Iskill[]> = {};
    for (const skill of this.skills) {
      if (skill.category) {
        if (!groups[skill.category]) groups[skill.category] = [];
        groups[skill.category].push(skill);
      }
    }
    const keys = Object.keys(groups);
    if (keys.length <= 1) return [];
    return keys.map(category => ({ category, skills: groups[category] }));
  }

  isUrl(value: string): boolean {
    if (!value) return false;
    if (value.startsWith('http') || value.startsWith('//')) return true;
    // Local upload paths like 'uploads/skills/icons/...'
    if (value.startsWith('uploads/')) return true;
    return false;
  }

  getIconUrl(icon: string): string {
    if (!icon) return '';
    if (icon.startsWith('http') || icon.startsWith('//')) return icon;
    if (icon.startsWith('uploads/')) return `${environment.apiUrl}/${icon}`;
    return icon;
  }

  isNumeric(value: any): boolean {
    return typeof value === 'number' || (!isNaN(Number(value)) && value !== '' && value !== null && !['Beginner', 'Intermediate', 'Advanced'].includes(value));
  }
}
