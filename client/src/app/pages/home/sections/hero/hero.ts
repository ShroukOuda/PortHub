import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from 'app/core/services/auth-service';
import { UserService } from 'app/core/services/user-service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
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
      }
    });
  }

  navigateToPortfolio() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard/portfolio']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
