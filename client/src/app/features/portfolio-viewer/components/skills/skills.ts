import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../../../core/services/portfolio/skill-service';
import { ActivatedRoute } from '@angular/router';
import { Iskill } from '../../../../core/models/iskill';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit {
  skills: Iskill[] = [];

  constructor(private skillService: SkillService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const portfolioId = this.route.snapshot.paramMap.get('id');
    if (portfolioId) {
      this.loadSkills(portfolioId);
    }
  }

  loadSkills(portfolioId: string) {
    this.skillService.getSkillByPortfolioId(portfolioId).subscribe(
      (data: Iskill[]) => {
        this.skills = data;
      },
      (error) => {
        console.error('Error loading skills', error);
      }
    );
  }
}
