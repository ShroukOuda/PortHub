import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginData = {
    login: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.loginData.login || !this.loginData.password) {
      alert('Please enter both fields');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        alert('Login successful');
        this.router.navigate(['/dashboard']); // or your desired page
      },
      error: (err) => {
        console.error('Login failed', err);
        alert(err.error?.message || 'Login failed');
      }
    });
  }
}
