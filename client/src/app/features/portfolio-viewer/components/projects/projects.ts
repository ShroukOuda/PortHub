import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../core/services/portfolio/project-service';
import { ActivatedRoute } from '@angular/router';
import { Iproject } from '../../../../core/models/iproject';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  projects: Iproject[] = [];

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const portfolioId = this.route.snapshot.paramMap.get('id');
    if (portfolioId) {
      this.loadProjects(portfolioId);
    }
  }

  loadProjects(portfolioId: string): void {
    this.projectService.getProjectByPortfolioId(portfolioId).subscribe(
      (data: Iproject[]) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error loading projects', error);
      }
    );
  }
 
}


