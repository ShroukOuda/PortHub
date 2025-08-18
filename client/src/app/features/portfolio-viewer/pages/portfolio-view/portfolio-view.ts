import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
// import { SocialLinks } from '../../components/social-links/social-links';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio/portfolio-service';


@Component({
  selector: 'app-portfolio-view',
  imports: [Header, RouterOutlet],
  templateUrl: './portfolio-view.html',
  styleUrls: ['./portfolio-view.css']
})
export class PortfolioView implements OnInit {
  constructor(private portfolioService: PortfolioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.loadPortfolio(userId);
    }
  }

  loadPortfolio(userId: string): void {
    this.portfolioService.getPortfoliosByUserId(userId).subscribe({
      next: (portfolio) => {
        console.log('Portfolio fetched successfully:', portfolio);
      },
      error: (error) => {
        console.error('Error fetching portfolio:', error);
      }
    });
  }

}
