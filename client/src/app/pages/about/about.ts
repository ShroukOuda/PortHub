import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-about',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  private userService = inject(UserService);

  totalUsers = signal(0);
  totalPortfolios = signal(0);
  totalCountries = signal(0);

  ngOnInit(): void {
    this.userService.getStats().subscribe({
      next: (stats) => {
        this.totalUsers.set(stats.totalUsers);
        this.totalPortfolios.set(stats.totalPortfolios);
        this.totalCountries.set(stats.totalCountries);
      },
      error: () => {
        this.totalUsers.set(0);
        this.totalPortfolios.set(0);
      }
    });
  }
}
