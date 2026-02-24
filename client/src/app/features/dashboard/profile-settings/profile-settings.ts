import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { IUser } from '../../../core/models/iuser';
import { environment } from '../../../../environments/environment';

interface Country {
  name: string;
  code: string;
  dialCode: string;
  format: string;
  minLength: number;
  maxLength: number;
}

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.css'
})
export class ProfileSettingsComponent implements OnInit {
  private authState = inject(AuthStateService);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  currentUser = signal<IUser | null>(null);
  isLoading = signal(false);
  isSaving = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  
  // Profile picture
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploadingPhoto = signal(false);

  // Form data
  formData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
    jobTitle: '',
    gender: 'other' as 'male' | 'female' | 'other',
    dateOfBirth: '',
    country: '',
    city: '',
    address: ''
  };

  // Countries list
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
  ].sort((a, b) => a.name.localeCompare(b.name));

  selectedCountry: Country | null = null;
  phoneNumber = ''; // Local phone number without dial code

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading.set(true);
    this.authState.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser.set(user);
        this.populateForm(user);
      }
      this.isLoading.set(false);
    });
  }

  populateForm(user: IUser) {
    this.formData = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      jobTitle: user.jobTitle || '',
      gender: user.gender || 'other',
      dateOfBirth: user.dateOfBirth ? this.formatDateForInput(user.dateOfBirth) : '',
      country: user.country || '',
      city: user.city || '',
      address: user.address || ''
    };

    // Set preview URL for profile picture
    if (user.profilePicture) {
      this.previewUrl = user.profilePicture.startsWith('http') 
        ? user.profilePicture 
        : `${this.apiUrl}/${user.profilePicture}`;
    } else if (user.profileImage) {
      this.previewUrl = user.profileImage.startsWith('http') 
        ? user.profileImage 
        : `${this.apiUrl}/${user.profileImage}`;
    }

    // Find and set country based on user's country name
    this.selectedCountry = this.countries.find(c => c.name === user.country) || null;
    
    // Extract local phone number if phone exists
    if (user.phone && this.selectedCountry) {
      this.phoneNumber = user.phone.replace(this.selectedCountry.dialCode, '').trim();
    } else {
      this.phoneNumber = user.phone || '';
    }
  }

  formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onCountryChange() {
    if (this.selectedCountry) {
      this.formData.country = this.selectedCountry.name;
      this.updatePhoneNumber();
    }
  }

  updatePhoneNumber() {
    if (this.selectedCountry && this.phoneNumber) {
      let digits = this.phoneNumber.replace(/\D/g, '');
      if (digits.startsWith('0')) {
        digits = digits.substring(1);
      }
      this.formData.phone = this.selectedCountry.dialCode + digits;
    }
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
      this.errorMessage.set('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage.set('File size must be less than 5MB');
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

  uploadProfilePicture() {
    if (!this.selectedFile) return;

    this.uploadingPhoto.set(true);
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<{path: string, url: string}>(`${this.apiUrl}/api/uploads/profiles`, formData).subscribe({
      next: (res) => {
        this.uploadingPhoto.set(false);
        this.previewUrl = res.url || `${this.apiUrl}/${res.path}`;
        // Update the user with new profile picture
        this.updateProfileField('profilePicture', res.path);
        this.successMessage.set('Profile picture updated successfully!');
        this.selectedFile = null;
        setTimeout(() => this.successMessage.set(''), 3000);
      },
      error: (err) => {
        this.uploadingPhoto.set(false);
        this.errorMessage.set('Failed to upload profile picture');
        setTimeout(() => this.errorMessage.set(''), 3000);
      }
    });
  }

  updateProfileField(field: string, value: any) {
    const userId = this.currentUser()?._id;
    if (!userId) return;

    this.http.put<any>(`${this.apiUrl}/api/users/me`, { [field]: value }).subscribe({
      next: (res) => {
        // Update local state
        const updated = { ...this.currentUser(), [field]: value } as IUser;
        this.authState.updateUser(updated);
      },
      error: (err) => console.error('Failed to update field:', err)
    });
  }

  saveProfile() {
    this.isSaving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    // Debug: Check if token exists
    const token = localStorage.getItem('token');
    console.log('🔍 saveProfile - Token in localStorage:', token ? 'EXISTS' : 'MISSING');
    console.log('🔍 saveProfile - Token value:', token?.substring(0, 50) + '...');

    // Update phone with country code
    this.updatePhoneNumber();

    const updateData = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      phone: this.formData.phone,
      bio: this.formData.bio,
      jobTitle: this.formData.jobTitle,
      gender: this.formData.gender,
      dateOfBirth: this.formData.dateOfBirth,
      country: this.formData.country,
      city: this.formData.city,
      address: this.formData.address
    };

    console.log('🔍 saveProfile - Making request to:', `${this.apiUrl}/api/users/me`);

    this.http.put<any>(`${this.apiUrl}/api/users/me`, updateData).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        this.successMessage.set('Profile updated successfully!');
        
        // Update auth state with new user data
        if (res.user) {
          this.authState.updateUser(res.user);
          this.currentUser.set(res.user);
        }
        
        setTimeout(() => this.successMessage.set(''), 3000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to update profile');
        setTimeout(() => this.errorMessage.set(''), 3000);
      }
    });
  }
}
