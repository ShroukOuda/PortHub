import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ExperienceService } from '../../../../core/services/portfolio/experience-service';
import { Iexperience } from '../../../../core/models/iexperience';


@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience implements OnInit {
  experience: Iexperience[] = [];

  constructor(private experienceService: ExperienceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const portfolioId = this.route.snapshot.paramMap.get('id');
    if (portfolioId) {
      this.loadExperience(portfolioId);
    }
  }

  loadExperience(portfolioId: string) {
    this.experienceService.getExperiencesByPortfolioId(portfolioId).subscribe(
      (data: Iexperience[]) => {
        this.experience = data;
      },
      (error) => {
        console.error('Error loading experience', error);
      }
    );
  }
}

