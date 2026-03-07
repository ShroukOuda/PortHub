import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { PortfolioDataService, PortfolioData } from '../../../../core/services/portfolio/portfolio-data.service';
import { Icertificate } from '../../../../core/models/icertificate';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class Certificates implements OnInit, OnDestroy {
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

  get certificates(): Icertificate[] {
    return this.portfolioData?.certificates || [];
  }

  getCertificateImageUrl(cert: Icertificate): string {
    const img = cert.CertificateImage || '';
    if (!img || img === 'default-certificate-image.png') return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${environment.apiUrl}/${img}`;
  }

  hasCertificateImage(cert: Icertificate): boolean {
    return !!this.getCertificateImageUrl(cert);
  }
}
