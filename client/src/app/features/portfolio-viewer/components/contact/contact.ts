import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';

@Component({
  selector: 'app-contact',
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit, OnDestroy {
  portfolioData: PortfolioData | null = null;
  private subscription: Subscription | null = null;

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

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

  hasSocialLinks(): boolean {
    const social = this.portfolio?.sociallinks;
    if (!social) return false;
    return !!(social.github || social.linkedin || social.twitter || social.facebook || social.instagram);
  }

  sendEmail(event: Event) {
    event.preventDefault();
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Open email client with pre-filled data
    const mailtoLink = `mailto:${this.user?.email || ''}?subject=Contact from ${this.contactForm.name}&body=${encodeURIComponent(this.contactForm.message)}%0A%0AFrom: ${this.contactForm.name} (${this.contactForm.email})`;
    window.open(mailtoLink);
    
    alert('Opening your email client...');
    this.contactForm = { name: '', email: '', message: '' };
  }
}
