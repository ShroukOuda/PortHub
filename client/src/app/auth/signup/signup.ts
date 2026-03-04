import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { IuserRegister } from '../../core/models/iuser-register';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// Country data with phone codes and formats
interface Country {
  name: string;
  code: string;
  dialCode: string;
  format: string;
  minLength: number;
  maxLength: number;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit {

  selectedFile: File | null = null;
  isUploading = false;

  // List of countries with phone formats
  countries: Country[] = [
    { name: 'Egypt', code: 'EG', dialCode: '+20', format: '+20 XXX XXX XXXX', minLength: 10, maxLength: 11 },
    { name: 'United States', code: 'US', dialCode: '+1', format: '+1 (XXX) XXX-XXXX', minLength: 10, maxLength: 10 },
    { name: 'United Kingdom', code: 'GB', dialCode: '+44', format: '+44 XXXX XXXXXX', minLength: 10, maxLength: 11 },
    { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', format: '+966 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', format: '+971 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Germany', code: 'DE', dialCode: '+49', format: '+49 XXX XXXXXXXX', minLength: 10, maxLength: 12 },
    { name: 'France', code: 'FR', dialCode: '+33', format: '+33 X XX XX XX XX', minLength: 9, maxLength: 9 },
    { name: 'Italy', code: 'IT', dialCode: '+39', format: '+39 XXX XXX XXXX', minLength: 9, maxLength: 11 },
    { name: 'Spain', code: 'ES', dialCode: '+34', format: '+34 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Canada', code: 'CA', dialCode: '+1', format: '+1 (XXX) XXX-XXXX', minLength: 10, maxLength: 10 },
    { name: 'Australia', code: 'AU', dialCode: '+61', format: '+61 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'India', code: 'IN', dialCode: '+91', format: '+91 XXXXX XXXXX', minLength: 10, maxLength: 10 },
    { name: 'China', code: 'CN', dialCode: '+86', format: '+86 XXX XXXX XXXX', minLength: 11, maxLength: 11 },
    { name: 'Japan', code: 'JP', dialCode: '+81', format: '+81 XX XXXX XXXX', minLength: 10, maxLength: 11 },
    { name: 'South Korea', code: 'KR', dialCode: '+82', format: '+82 XX XXXX XXXX', minLength: 9, maxLength: 11 },
    { name: 'Brazil', code: 'BR', dialCode: '+55', format: '+55 XX XXXXX XXXX', minLength: 10, maxLength: 11 },
    { name: 'Mexico', code: 'MX', dialCode: '+52', format: '+52 XXX XXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'Russia', code: 'RU', dialCode: '+7', format: '+7 XXX XXX XX XX', minLength: 10, maxLength: 10 },
    { name: 'Turkey', code: 'TR', dialCode: '+90', format: '+90 XXX XXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'South Africa', code: 'ZA', dialCode: '+27', format: '+27 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Nigeria', code: 'NG', dialCode: '+234', format: '+234 XXX XXX XXXX', minLength: 10, maxLength: 11 },
    { name: 'Kenya', code: 'KE', dialCode: '+254', format: '+254 XXX XXXXXX', minLength: 9, maxLength: 10 },
    { name: 'Morocco', code: 'MA', dialCode: '+212', format: '+212 XXX XXXXXX', minLength: 9, maxLength: 9 },
    { name: 'Algeria', code: 'DZ', dialCode: '+213', format: '+213 XXX XX XX XX', minLength: 9, maxLength: 9 },
    { name: 'Tunisia', code: 'TN', dialCode: '+216', format: '+216 XX XXX XXX', minLength: 8, maxLength: 8 },
    { name: 'Jordan', code: 'JO', dialCode: '+962', format: '+962 X XXXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Lebanon', code: 'LB', dialCode: '+961', format: '+961 XX XXX XXX', minLength: 7, maxLength: 8 },
    { name: 'Iraq', code: 'IQ', dialCode: '+964', format: '+964 XXX XXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'Kuwait', code: 'KW', dialCode: '+965', format: '+965 XXXX XXXX', minLength: 8, maxLength: 8 },
    { name: 'Qatar', code: 'QA', dialCode: '+974', format: '+974 XXXX XXXX', minLength: 8, maxLength: 8 },
    { name: 'Bahrain', code: 'BH', dialCode: '+973', format: '+973 XXXX XXXX', minLength: 8, maxLength: 8 },
    { name: 'Oman', code: 'OM', dialCode: '+968', format: '+968 XXXX XXXX', minLength: 8, maxLength: 8 },
    { name: 'Pakistan', code: 'PK', dialCode: '+92', format: '+92 XXX XXXXXXX', minLength: 10, maxLength: 10 },
    { name: 'Bangladesh', code: 'BD', dialCode: '+880', format: '+880 XXXX XXXXXX', minLength: 10, maxLength: 10 },
    { name: 'Indonesia', code: 'ID', dialCode: '+62', format: '+62 XXX XXXX XXXX', minLength: 9, maxLength: 12 },
    { name: 'Malaysia', code: 'MY', dialCode: '+60', format: '+60 XX XXX XXXX', minLength: 9, maxLength: 10 },
    { name: 'Singapore', code: 'SG', dialCode: '+65', format: '+65 XXXX XXXX', minLength: 8, maxLength: 8 },
    { name: 'Thailand', code: 'TH', dialCode: '+66', format: '+66 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Vietnam', code: 'VN', dialCode: '+84', format: '+84 XXX XXX XXXX', minLength: 9, maxLength: 10 },
    { name: 'Philippines', code: 'PH', dialCode: '+63', format: '+63 XXX XXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'Netherlands', code: 'NL', dialCode: '+31', format: '+31 X XXXXXXXX', minLength: 9, maxLength: 9 },
    { name: 'Belgium', code: 'BE', dialCode: '+32', format: '+32 XXX XX XX XX', minLength: 9, maxLength: 9 },
    { name: 'Switzerland', code: 'CH', dialCode: '+41', format: '+41 XX XXX XX XX', minLength: 9, maxLength: 9 },
    { name: 'Austria', code: 'AT', dialCode: '+43', format: '+43 XXX XXXXXXX', minLength: 10, maxLength: 11 },
    { name: 'Poland', code: 'PL', dialCode: '+48', format: '+48 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Sweden', code: 'SE', dialCode: '+46', format: '+46 XX XXX XX XX', minLength: 9, maxLength: 9 },
    { name: 'Norway', code: 'NO', dialCode: '+47', format: '+47 XXX XX XXX', minLength: 8, maxLength: 8 },
    { name: 'Denmark', code: 'DK', dialCode: '+45', format: '+45 XX XX XX XX', minLength: 8, maxLength: 8 },
    { name: 'Finland', code: 'FI', dialCode: '+358', format: '+358 XX XXX XXXX', minLength: 9, maxLength: 10 },
    { name: 'Greece', code: 'GR', dialCode: '+30', format: '+30 XXX XXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'Portugal', code: 'PT', dialCode: '+351', format: '+351 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Ireland', code: 'IE', dialCode: '+353', format: '+353 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'New Zealand', code: 'NZ', dialCode: '+64', format: '+64 XX XXX XXXX', minLength: 9, maxLength: 10 },
    { name: 'Argentina', code: 'AR', dialCode: '+54', format: '+54 XX XXXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'Chile', code: 'CL', dialCode: '+56', format: '+56 X XXXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Colombia', code: 'CO', dialCode: '+57', format: '+57 XXX XXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'Peru', code: 'PE', dialCode: '+51', format: '+51 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Venezuela', code: 'VE', dialCode: '+58', format: '+58 XXX XXX XXXX', minLength: 10, maxLength: 10 },
    { name: 'Ukraine', code: 'UA', dialCode: '+380', format: '+380 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Czech Republic', code: 'CZ', dialCode: '+420', format: '+420 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Romania', code: 'RO', dialCode: '+40', format: '+40 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Hungary', code: 'HU', dialCode: '+36', format: '+36 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Israel', code: 'IL', dialCode: '+972', format: '+972 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Palestine', code: 'PS', dialCode: '+970', format: '+970 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Syria', code: 'SY', dialCode: '+963', format: '+963 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Yemen', code: 'YE', dialCode: '+967', format: '+967 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Libya', code: 'LY', dialCode: '+218', format: '+218 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Sudan', code: 'SD', dialCode: '+249', format: '+249 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Ethiopia', code: 'ET', dialCode: '+251', format: '+251 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Ghana', code: 'GH', dialCode: '+233', format: '+233 XX XXX XXXX', minLength: 9, maxLength: 9 },
    { name: 'Tanzania', code: 'TZ', dialCode: '+255', format: '+255 XXX XXX XXX', minLength: 9, maxLength: 9 },
    { name: 'Uganda', code: 'UG', dialCode: '+256', format: '+256 XXX XXXXXX', minLength: 9, maxLength: 9 },
  ].sort((a, b) => a.name.localeCompare(b.name));

  selectedCountry: Country | null = null;
  phoneNumber: string = ''; // Local phone number without dial code

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
  emailInvalid = false;
  emailValidationMessage = '';
  isValidatingEmail = false;
  phoneInvalid = false;
  phoneValidationMessage = '';
  isValidatingPhone = false;
  passwordError = '';
  confirmPasswordError = '';

  // Job titles from API
  jobTitles: { _id: string; title: string }[] = [];
  private http: HttpClient;

  constructor(private authService: AuthService, private router: Router, http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
    // Set default country to Egypt
    this.selectedCountry = this.countries.find(c => c.code === 'EG') || null;
    if (this.selectedCountry) {
      this.formData.country = this.selectedCountry.name;
    }
    // Load job titles from API
    this.http.get<any>(`${environment.apiUrl}/api/job-titles/active`).subscribe({
      next: (res: any) => this.jobTitles = Array.isArray(res) ? res : (res?.data || []),
      error: () => {}
    });
  }

  onCountryChange() {
    if (this.selectedCountry) {
      this.formData.country = this.selectedCountry.name;
      // Reset phone number when country changes
      this.phoneNumber = '';
      this.formData.phone = '';
      this.phoneInvalid = false;
      this.phoneValidationMessage = '';
    }
  }

  formatPhoneNumber() {
    if (!this.selectedCountry || !this.phoneNumber) {
      this.formData.phone = '';
      return;
    }
    
    // Remove all non-digit characters
    let digits = this.phoneNumber.replace(/\D/g, '');
    
    // Remove leading zero if present (common in local formats)
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    
    // Combine dial code with local number
    this.formData.phone = this.selectedCountry.dialCode + digits;
  }

  getPhonePlaceholder(): string {
    if (!this.selectedCountry) return 'Select a country first';
    return this.selectedCountry.format.replace(this.selectedCountry.dialCode + ' ', '');
  }

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
    
    // First check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.emailInvalid = true;
      this.emailValidationMessage = 'Invalid email format';
      return;
    }
    
    this.isValidatingEmail = true;
    this.emailInvalid = false;
    this.emailValidationMessage = '';
    
    // Check if email exists
    this.authService.checkEmail(this.formData.email).subscribe({
      next: (res: any) => {
        this.emailExists = res.exists;
        if (!res.exists) {
          // Validate email domain
          this.authService.validateEmail(this.formData.email).subscribe({
            next: (validationRes: any) => {
              this.isValidatingEmail = false;
              this.emailInvalid = !validationRes.valid;
              this.emailValidationMessage = validationRes.valid ? '' : validationRes.message;
            },
            error: () => {
              this.isValidatingEmail = false;
            }
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

  checkPhone() {
    // Format the phone number first
    this.formatPhoneNumber();
    
    if (!this.phoneNumber || !this.selectedCountry) {
      this.phoneInvalid = !this.phoneNumber && this.selectedCountry !== null;
      this.phoneValidationMessage = this.phoneInvalid ? 'Phone number is required' : '';
      return;
    }
    
    // Get digits only from local number
    const digits = this.phoneNumber.replace(/\D/g, '').replace(/^0/, '');
    
    // Validate length based on country
    if (digits.length < this.selectedCountry.minLength) {
      this.phoneInvalid = true;
      this.phoneValidationMessage = `Phone number is too short. Expected ${this.selectedCountry.minLength} digits for ${this.selectedCountry.name}`;
      return;
    }
    
    if (digits.length > this.selectedCountry.maxLength) {
      this.phoneInvalid = true;
      this.phoneValidationMessage = `Phone number is too long. Expected ${this.selectedCountry.maxLength} digits for ${this.selectedCountry.name}`;
      return;
    }
    
    // Call backend validation
    this.isValidatingPhone = true;
    this.phoneInvalid = false;
    this.phoneValidationMessage = '';
    
    this.authService.validatePhone(this.formData.phone).subscribe({
      next: (res: any) => {
        this.isValidatingPhone = false;
        this.phoneInvalid = !res.valid;
        this.phoneValidationMessage = res.valid ? '' : res.message;
      },
      error: () => {
        this.isValidatingPhone = false;
        this.phoneInvalid = false;
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
      this.phoneInvalid ||
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
