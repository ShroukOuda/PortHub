import { Component, OnInit, inject, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { UserService } from 'app/core/services/user-service';
import { ScrollRevealDirective } from 'app/shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  imports: [LucideAngularModule, ScrollRevealDirective],
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
      }
    });
  }
}
