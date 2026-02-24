import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  // Step tracking: 1 = email, 2 = code verification, 3 = new password
  currentStep = signal(1);
  
  // Form data
  email = '';
  resetCode = '';
  newPassword = '';
  confirmPassword = '';
  
  // State
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  
  // For development - show code (remove in production)
  devResetCode = signal('');

  submitEmail() {
    if (!this.email) {
      this.errorMessage.set('Please enter your email address');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.http.post<{ message: string; resetCode?: string }>(`${this.apiUrl}/api/auth/forgot-password`, { 
      email: this.email 
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(res.message || 'A reset code has been sent to your email');
        // For development only - show code when email service not configured
        if (res.resetCode) {
          this.devResetCode.set(res.resetCode);
          this.resetCode = res.resetCode; // Auto-fill the code
        }
        this.currentStep.set(2);
        setTimeout(() => this.successMessage.set(''), 5000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to send reset code');
      }
    });
  }

  verifyCode() {
    if (!this.resetCode || this.resetCode.length !== 6) {
      this.errorMessage.set('Please enter the 6-digit code');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.http.post<{ valid: boolean; message: string }>(`${this.apiUrl}/api/auth/verify-reset-code`, { 
      email: this.email,
      code: this.resetCode
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.valid) {
          this.currentStep.set(3);
          this.successMessage.set('Code verified! Enter your new password');
          setTimeout(() => this.successMessage.set(''), 3000);
        } else {
          this.errorMessage.set(res.message || 'Invalid code');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Invalid or expired code');
      }
    });
  }

  resetPassword() {
    this.errorMessage.set('');

    // Validate password
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!strongPassword.test(this.newPassword)) {
      this.errorMessage.set('Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);

    this.http.post<{ message: string }>(`${this.apiUrl}/api/auth/reset-password`, { 
      email: this.email,
      code: this.resetCode,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to reset password');
      }
    });
  }

  resendCode() {
    this.resetCode = '';
    this.devResetCode.set('');
    this.submitEmail();
  }

  goBack() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      this.errorMessage.set('');
      this.successMessage.set('');
    }
  }
}
