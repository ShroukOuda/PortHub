import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { IPortfolio } from '../../../core/models/iportfolio';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-portfolio-settings',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: './portfolio-settings.html',
  styleUrl: './portfolio-settings.css'
})
export class PortfolioSettingsComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);
  private authState = inject(AuthStateService);
  private http = inject(HttpClient);

  loading = signal(true);
  saving = signal(false);
  uploadingCv = signal(false);
  hasPortfolio = signal(false);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  formData = signal<Partial<IPortfolio>>({
    title: '',
    tagline: '',
    bio: '',
    isPublic: true,
    cvUrl: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      facebook: '',
      instagram: '',
      website: ''
    }
  });

  ngOnInit() {
    this.loadPortfolio();
  }

  loadPortfolio() {
    this.loading.set(true);
    this.portfolioService.getMyPortfolio().subscribe({
      next: (portfolio) => {
        if (portfolio) {
          this.hasPortfolio.set(true);
          this.formData.set({
            _id: portfolio._id,
            userId: portfolio.userId?._id || portfolio.userId,
            title: portfolio.title || '',
            tagline: portfolio.tagline || '',
            bio: portfolio.bio || '',
            isPublic: portfolio.isPublic !== false,
            cvUrl: portfolio.cvUrl || '',
            socialLinks: {
              linkedin: portfolio.socialLinks?.linkedin || portfolio.sociallinks?.linkedin || '',
              github: portfolio.socialLinks?.github || portfolio.sociallinks?.github || '',
              twitter: portfolio.socialLinks?.twitter || portfolio.sociallinks?.twitter || '',
              facebook: portfolio.socialLinks?.facebook || portfolio.sociallinks?.facebook || '',
              instagram: portfolio.socialLinks?.instagram || portfolio.sociallinks?.instagram || '',
              website: portfolio.socialLinks?.website || portfolio.sociallinks?.website || ''
            }
          });
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  updateField(field: string, value: any) {
    this.formData.update(data => ({
      ...data,
      [field]: value
    }));
  }

  updateSocialLink(platform: string, value: string) {
    this.formData.update(data => ({
      ...data,
      socialLinks: {
        ...data.socialLinks,
        [platform]: value
      }
    }));
  }

  onCvFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    
    const file = input.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (file.size > maxSize) {
      this.message.set({ type: 'error', text: 'File size must be less than 5MB.' });
      return;
    }
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      this.message.set({ type: 'error', text: 'Only PDF, DOC, and DOCX files are allowed.' });
      return;
    }

    this.uploadingCv.set(true);
    
    const formData = new FormData();
    formData.append('cv', file);
    
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.post<any>(`${environment.apiUrl}/api/uploads/cv`, formData, { headers }).subscribe({
      next: (response) => {
        this.updateField('cvUrl', response.url || response.cvUrl);
        this.uploadingCv.set(false);
        this.message.set({ type: 'success', text: 'CV uploaded successfully!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.uploadingCv.set(false);
        this.message.set({ type: 'error', text: 'Failed to upload CV. Please try again.' });
      }
    });
  }

  removeCv() {
    this.updateField('cvUrl', '');
    this.message.set({ type: 'success', text: 'CV removed. Save to apply changes.' });
    setTimeout(() => this.message.set(null), 3000);
  }

  save() {
    if (!this.formData().title) {
      this.message.set({ type: 'error', text: 'Portfolio title is required.' });
      return;
    }

    this.saving.set(true);
    this.message.set(null);

    const operation = this.hasPortfolio()
      ? this.portfolioService.updatePortfolio(this.formData()._id!, this.formData())
      : this.portfolioService.createPortfolio(this.formData());

    operation.subscribe({
      next: (portfolio) => {
        this.hasPortfolio.set(true);
        this.formData.update(data => ({ ...data, _id: portfolio._id }));
        this.saving.set(false);
        this.message.set({ 
          type: 'success', 
          text: this.hasPortfolio() ? 'Portfolio updated successfully!' : 'Portfolio created successfully!' 
        });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => {
        this.saving.set(false);
        this.message.set({ type: 'error', text: 'Failed to save portfolio. Please try again.' });
      }
    });
  }

  copyLink() {
    const userId = this.formData().userId?._id || this.formData().userId || this.authState.currentUser?._id;
    if (userId) {
      const link = `${window.location.origin}/portfolio-view/${userId}`;
      navigator.clipboard.writeText(link).then(() => {
        this.message.set({ type: 'success', text: 'Link copied to clipboard!' });
        setTimeout(() => this.message.set(null), 3000);
      }).catch(() => {
        this.message.set({ type: 'error', text: 'Failed to copy link.' });
      });
    }
  }

  openPortfolio() {
    const userId = this.formData().userId?._id || this.formData().userId || this.authState.currentUser?._id;
    if (userId) {
      window.open(`/portfolio-view/${userId}`, '_blank');
    }
  }
}
