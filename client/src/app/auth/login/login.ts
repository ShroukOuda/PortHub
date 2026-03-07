import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { AuthStateService } from '../../core/services/auth-state.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, LucideAngularModule, MouseFollowDirective],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginData = {
    login: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private authState: AuthStateService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.loginData.login || !this.loginData.password) {
      alert('Please enter both fields');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        // Use AuthStateService to manage auth state
        this.authState.login(res.user, res.accessToken);
        alert('Login successful');
        // Redirect based on role
        if (res.user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert(err.error?.message || 'Login failed');
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithGitHub() {
    this.authService.loginWithGitHub();
  }
}
