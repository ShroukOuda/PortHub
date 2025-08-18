import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EducationService } from '../../../../core/services/portfolio/education-service';
import { Ieducation } from '../../../../core/models/ieducation';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education implements OnInit {
  education: Ieducation[] = [];

  constructor(private educationService: EducationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const portfolioId = this.route.snapshot.paramMap.get('id');
    if (portfolioId) {
      this.loadEducation(portfolioId);
    }
  }

  loadEducation(portfolioId: string) {
    this.educationService.getEducationsByPortfolioId(portfolioId).subscribe(
      (data: Ieducation[]) => {
        this.education = data;
      },
      (error) => {
        console.error('Error loading education', error);
      }
    );
  }
}
