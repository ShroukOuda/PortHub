import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../../../../core/services/portfolio/certificate-service';
import { Icertificate } from '../../../../core/models/icertificate';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class Certificates implements OnInit {
  certificates: Icertificate[] = [];

  constructor(private certificateService: CertificateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const portfolioId = this.route.snapshot.paramMap.get('id');
    if (portfolioId) {
      this.loadCertificates(portfolioId);
    }
  }

  loadCertificates(portfolioId: string) {
    this.certificateService.getCertificatesByPortfolioId(portfolioId).subscribe(
      (data: Icertificate[]) => {
        this.certificates = data;
      },
      (error) => {
        console.error('Error loading certificates', error);
      }
    );
  }
}
