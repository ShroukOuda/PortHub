import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../../core/services/portfolio/service-service';
import { ActivatedRoute } from '@angular/router';
import { Iservice } from '../../../../core/models/iservice';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services implements OnInit {
  services: Iservice[] = [];

  constructor(private serviceService: ServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const portfolioId = this.route.snapshot.paramMap.get('id');
    if (portfolioId) {
      this.loadServices(portfolioId);
    }
  }

  loadServices(portfolioId: string) {
    this.serviceService.getServiceByPortfolioId(portfolioId).subscribe(
      (data: Iservice[]) => {
        this.services = data;
      },
      (error) => {
        console.error('Error loading services', error);
      }
    );
  }
}
