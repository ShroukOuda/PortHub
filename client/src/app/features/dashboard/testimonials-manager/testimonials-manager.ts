import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { ITestimonial } from '../../../core/models/itestimonial';

@Component({
  selector: 'app-testimonials-manager',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './testimonials-manager.html',
  styleUrls: ['../projects-manager/projects-manager.css', './testimonials-manager.css']
})
export class TestimonialsManagerComponent implements OnInit {
  testimonials: ITestimonial[] = [];
  loading = true;
  saving = false;
  showModal = false;
  editMode = false;
  currentTestimonial: Partial<ITestimonial> = {};
  message: { type: 'success' | 'error'; text: string } | null = null;

  constructor(private portfolioService: DashboardPortfolioService) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.loading = true;
    this.portfolioService.getMyTestimonials().subscribe({
      next: (testimonials) => {
        this.testimonials = testimonials || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load testimonials:', err);
        this.loading = false;
      }
    });
  }

  openModal(): void {
    this.editMode = false;
    this.currentTestimonial = {
      rating: 5
    };
    this.showModal = true;
  }

  editTestimonial(testimonial: ITestimonial): void {
    this.editMode = true;
    this.currentTestimonial = { ...testimonial };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentTestimonial = {};
  }

  saveTestimonial(): void {
    if (!this.currentTestimonial.author || !this.currentTestimonial.content) {
      this.message = { type: 'error', text: 'Client name and content are required.' };
      return;
    }

    this.saving = true;
    this.message = null;

    if (this.editMode && this.currentTestimonial._id) {
      this.portfolioService.updateTestimonial(this.currentTestimonial._id, this.currentTestimonial).subscribe({
        next: (result) => {
          // Update locally
          this.testimonials = this.testimonials.map(t => 
            t._id === result._id ? result : t
          );
          this.closeModal();
          this.saving = false;
          this.message = { type: 'success', text: 'Testimonial updated successfully!' };
          setTimeout(() => this.message = null, 3000);
        },
        error: (err: any) => {
          console.error('Failed to update testimonial:', err);
          this.saving = false;
          this.message = { type: 'error', text: 'Failed to update testimonial.' };
        }
      });
    } else {
      this.portfolioService.createTestimonial(this.currentTestimonial).subscribe({
        next: (result) => {
          // Add locally
          this.testimonials = [...this.testimonials, result];
          this.closeModal();
          this.saving = false;
          this.message = { type: 'success', text: 'Testimonial added successfully!' };
          setTimeout(() => this.message = null, 3000);
        },
        error: (err: any) => {
          console.error('Failed to add testimonial:', err);
          this.saving = false;
          this.message = { type: 'error', text: 'Failed to add testimonial.' };
        }
      });
    }
  }

  deleteTestimonial(id: string): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.portfolioService.deleteTestimonial(id).subscribe({
        next: () => {
          this.testimonials = this.testimonials.filter(t => t._id !== id);
          this.message = { type: 'success', text: 'Testimonial deleted!' };
          setTimeout(() => this.message = null, 3000);
        },
        error: (err) => {
          console.error('Failed to delete testimonial:', err);
          this.message = { type: 'error', text: 'Failed to delete testimonial.' };
        }
      });
    }
  }

  setRating(rating: number): void {
    this.currentTestimonial.rating = rating;
  }

  getStars(rating: number = 5): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
