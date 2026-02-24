import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { AuthStateService } from '../../core/services/auth-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback.html',
  styleUrl: './callback.css'
})
export class AuthCallback implements OnInit {
  message = 'Completing authentication...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private authState: AuthStateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const userId = params['userId'];
      const error = params['error'];

      if (error) {
        this.message = 'Authentication failed. Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
        return;
      }

      if (token && userId) {
        // Fetch user data and complete login
        this.authService.getOAuthUser(userId, token).subscribe({
          next: (res: any) => {
            this.authState.login(res.user, token);
            this.message = 'Login successful! Redirecting...';
            
            setTimeout(() => {
              if (res.user.role === 'admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/dashboard']);
              }
            }, 1000);
          },
          error: (err) => {
            console.error('OAuth callback error:', err);
            this.message = 'Failed to complete authentication. Redirecting...';
            setTimeout(() => this.router.navigate(['/login']), 2000);
          }
        });
      } else {
        this.message = 'Invalid authentication response. Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    });
  }
}
