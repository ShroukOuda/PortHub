import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../../../core/services/portfolio/testimonial-service';
import { ActivatedRoute } from '@angular/router';
import { Itestimonial } from '../../../../core/models/itestimonial';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials implements OnInit {
  testimonials: Itestimonial[] = [];

  constructor(private testimonialService: TestimonialService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const portfolioId = this.route.snapshot.paramMap.get('id');
    if (portfolioId) {
      this.loadTestimonials(portfolioId);
    }
  }

  loadTestimonials(portfolioId: string) {
    this.testimonialService.getTestimonialByPortfolioId(portfolioId).subscribe(
      (data: Itestimonial[]) => {
        this.testimonials = data;
      },
      (error) => {
        console.error('Error loading testimonials', error);
      }
    );
  }
}
