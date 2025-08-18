import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { IuserRegister } from '../../core/models/iuser-register';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit {

  selectedFile: File | null = null;
  isUploading = false;

  formData: IuserRegister = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    bio: '',
    jobTitle: '',
    gender: 'other',
    dateOfBirth: '',
    country: '',
    city: '',
    address: '',
    role: 'user'
  };

  usernameExists = false;
  emailExists = false;
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
    this.authService.checkEmail(this.formData.email).subscribe({
      next: (res: any) => this.emailExists = res.exists,
      error: () => this.emailExists = false
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
      this.passwordError ||
      this.confirmPasswordError
    ) {
      alert('Please fix the errors before submitting!');
      return;
    }

    const payload = new FormData();

    // Append all form fields except profilePicture
    Object.entries(this.formData).forEach(([key, value]) => {
      if (key !== 'profilePicture' && value != null) payload.append(key, value as string);
    });

    // Append profile picture if selected
    if (this.selectedFile) {
      payload.append('profilePicture', this.selectedFile);
    }
  


    this.isUploading = true;

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.isUploading = false;
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isUploading = false;
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
