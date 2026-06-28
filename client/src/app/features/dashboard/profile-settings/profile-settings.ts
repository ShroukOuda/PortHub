import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthState } from '../../../core/services/auth-state';
import { Admin } from '../../../core/services/admin';
import { PortfolioDataService } from '../../../core/services/portfolio/portfolio-data.service';
import { IUser } from '../../../core/models/iuser';
import { environment } from '../../../../environments/environment';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';


@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.css'
})
export class ProfileSettings implements OnInit {
  private authState = inject(AuthState);
  private http = inject(HttpClient);
  private portfolioDataService = inject(PortfolioDataService);
  private adminService = inject(Admin);
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
  cacheBuster = signal(Date.now());

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

  // Countries from API
  countries: { _id: string; name: string; code: string; dialCode: string; isactive: boolean }[] = [];

  selectedCountry: { _id: string; name: string; code: string; dialCode: string; isactive: boolean } | null = null;
  phoneNumber = ''; // Local phone number without dial code

  // Job titles from API
  jobTitles = signal<{ _id: string; title: string }[]>([]);

  // Validation errors
  validationErrors = signal<Record<string, string>>({});

  ngOnInit() {
    this.loadUserData();
    this.loadCountries();
    this.loadJobTitles();
  }

  loadJobTitles() {
    this.adminService.getActiveJobTitles().subscribe({
      next: (titles) => this.jobTitles.set(titles),
      error: () => {}
    });
  }

  loadCountries() {
    this.adminService.getCountries().subscribe({
      next: (res) => {
        this.countries = res.data;
        // Set selected country if user has one
        if (this.currentUser() && this.currentUser()!.country) {
          this.selectedCountry = this.countries.find(c => c.name === this.currentUser()!.country) || null;
        }
      },
      error: () => {}
    });
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
      const base = user.profilePicture.startsWith('http') 
        ? user.profilePicture 
        : `${this.apiUrl}/${user.profilePicture}`;
      this.previewUrl = `${base}?t=${this.cacheBuster()}`;
    } else if (user.profileImage) {
      const base = user.profileImage.startsWith('http') 
        ? user.profileImage 
        : `${this.apiUrl}/${user.profileImage}`;
      this.previewUrl = `${base}?t=${this.cacheBuster()}`;
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
    return this.selectedCountry.dialCode + ' ' + 'Enter phone number';
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
        // Bust browser cache with timestamp
        this.cacheBuster.set(Date.now());
        const baseUrl = res.url || `${this.apiUrl}/${res.path}`;
        this.previewUrl = `${baseUrl}?t=${this.cacheBuster()}`;
        // Update the user with new profile picture
        this.updateProfileField('profilePicture', res.path);
        // Also update auth state immediately
        const updatedUser = { ...this.currentUser(), profilePicture: res.path } as IUser;
        this.authState.updateUser(updatedUser);
        this.currentUser.set(updatedUser);
        this.successMessage.set('Profile picture updated successfully!');
        this.selectedFile = null;
        // Refresh portfolio viewer cache
        this.portfolioDataService.refreshPortfolio();
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

    const payload: any = { [field]: value };
    if (field === 'profilePicture') {
      payload.oldProfilePicture = this.currentUser()?.profilePicture;
    }

    this.http.put<any>(`${this.apiUrl}/api/users/me`, payload).subscribe({
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

    // Validate before saving
    const errors: Record<string, string> = {};
    if (!this.formData.firstName.trim()) errors['firstName'] = 'First name is required';
    if (!this.formData.lastName.trim()) errors['lastName'] = 'Last name is required';
    if (!this.formData.bio.trim()) errors['bio'] = 'Bio is required';
    if (!this.formData.jobTitle.trim()) errors['jobTitle'] = 'Job title is required';
    if (!this.formData.country.trim()) errors['country'] = 'Country is required';
    if (!this.formData.city.trim()) errors['city'] = 'City is required';
    
    // Phone validation
    this.updatePhoneNumber();
    if (this.selectedCountry && this.phoneNumber) {
      const digits = this.phoneNumber.replace(/\D/g, '').replace(/^0/, '');
      if (digits.length < 6 || digits.length > 15) {
        errors['phone'] = 'Phone number must be between 6 and 15 digits';
      }
    }

    this.validationErrors.set(errors);
    if (Object.keys(errors).length > 0) {
      this.isSaving.set(false);
      this.errorMessage.set('Please fix the validation errors before saving.');
      setTimeout(() => this.errorMessage.set(''), 3000);
      return;
    }

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

    this.http.put<any>(`${this.apiUrl}/api/users/me`, updateData).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        this.successMessage.set('Profile updated successfully!');
        
        // Update auth state with new user data
        if (res.user) {
          this.authState.updateUser(res.user);
          this.currentUser.set(res.user);
        }
        
        // Refresh portfolio viewer cache so public page reflects changes
        this.portfolioDataService.refreshPortfolio();
        
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
