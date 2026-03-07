import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { IuserRegister } from '../../core/models/iuser-register';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit {

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isUploading = false;
  showPassword = false;
  showConfirmPassword = false;

  formData: IuserRegister = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  usernameExists = false;
  emailExists = false;
  emailInvalid = false;
  emailValidationMessage = '';
  isValidatingEmail = false;
  passwordError = '';
  confirmPasswordError = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    this.selectedFile = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  checkUsername() {
    if (!this.formData.username) return;
    this.authService.checkUsername(this.formData.username).subscribe({
      next: (res: any) => this.usernameExists = res.exists,
      error: () => this.usernameExists = false
    });
  }

  checkEmail() {
    if (!this.formData.email) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.emailInvalid = true;
      this.emailValidationMessage = 'Invalid email format';
      return;
    }
    this.isValidatingEmail = true;
    this.emailInvalid = false;
    this.emailValidationMessage = '';

    this.authService.checkEmail(this.formData.email).subscribe({
      next: (res: any) => {
        this.emailExists = res.exists;
        if (!res.exists) {
          this.authService.validateEmail(this.formData.email).subscribe({
            next: (validationRes: any) => {
              this.isValidatingEmail = false;
              this.emailInvalid = !validationRes.valid;
              this.emailValidationMessage = validationRes.valid ? '' : validationRes.message;
            },
            error: () => this.isValidatingEmail = false
          });
        } else {
          this.isValidatingEmail = false;
        }
      },
      error: () => {
        this.emailExists = false;
        this.isValidatingEmail = false;
      }
    });
  }

  validatePassword() {
    const strongPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    this.passwordError = strongPassword.test(this.formData.password ?? '')
      ? ''
      : 'Password must be at least 8 characters long, include a number, a special character, and a letter';
  }

  validateConfirmPassword() {
    this.confirmPasswordError =
      this.formData.password !== this.formData.confirmPassword
        ? 'Passwords do not match'
        : '';
  }

  onSubmit(form: NgForm) {
    if (
      form.invalid ||
      this.usernameExists ||
      this.emailExists ||
      this.emailInvalid ||
      this.passwordError ||
      this.confirmPasswordError
    ) {
      alert('Please fix the errors before submitting!');
      return;
    }

    const payload = new FormData();
    payload.append('firstName', this.formData.firstName);
    payload.append('lastName', this.formData.lastName);
    payload.append('username', this.formData.username);
    payload.append('email', this.formData.email);
    payload.append('password', this.formData.password);

    if (this.selectedFile) {
      payload.append('profilePicture', this.selectedFile);
    }

    this.isUploading = true;

    this.authService.register(payload).subscribe({
      next: () => {
        this.isUploading = false;
        alert('Registration successful! You can complete your profile in Settings.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isUploading = false;
        console.error('Registration failed:', error);
        alert(error.error?.message || 'Registration failed. Please try again.');
      }
    });
  }
}
