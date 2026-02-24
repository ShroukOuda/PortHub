import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { Iskill } from '../../../../core/models/iskill';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit, OnDestroy {
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
    return value?.startsWith('http') || value?.startsWith('//');
  }

  isNumeric(value: any): boolean {
    return typeof value === 'number' || (!isNaN(Number(value)) && value !== '' && value !== null && !['Beginner', 'Intermediate', 'Advanced'].includes(value));
  }
}
