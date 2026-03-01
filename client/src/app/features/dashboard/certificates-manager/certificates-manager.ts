import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { ICertificate } from '../../../core/models/icertificate';

@Component({
  selector: 'app-certificates-manager',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: "./certificates-manager.html",
  styleUrls: ['../projects-manager/projects-manager.css', './certificates-manager.css']
})
export class CertificatesManagerComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);

  loading = signal(true);
  saving = signal(false);
  items = signal<ICertificate[]>([]);
  showModal = signal(false);
  editingItem = signal<ICertificate | null>(null);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);
  formData = signal<Partial<ICertificate>>({ title: '', issuer: '', issueDate: '', expiryDate: '', credentialUrl: '', credentialId: '' });

  // Image upload
  imageMode = signal<'url' | 'upload'>('url');
  selectedImageFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  ngOnInit() { this.loadItems(); }

  loadItems() {
    this.loading.set(true);
    this.portfolioService.getMyCertificates().subscribe({
      next: (items) => { this.items.set(items); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  openAddModal() {
    this.editingItem.set(null);
    this.formData.set({ title: '', issuer: '', issueDate: '', expiryDate: '', credentialUrl: '', credentialId: '', CertificateImage: '' });
    this.imageMode.set('url');
    this.selectedImageFile.set(null);
    this.imagePreview.set(null);
    this.showModal.set(true);
  }

  openEditModal(item: ICertificate) {
    this.editingItem.set(item);
    this.formData.set({ 
      title: item.title, 
      issuer: item.issuer,
      issueDate: item.issueDate ? new Date(item.issueDate).toISOString().split('T')[0] : '',
      expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : '',
      credentialUrl: item.credentialUrl,
      credentialId: item.credentialId,
      CertificateImage: item.CertificateImage || ''
    });
    this.imageMode.set('url');
    this.selectedImageFile.set(null);
    this.imagePreview.set(null);
    this.showModal.set(true);
  }

  closeModal() { this.showModal.set(false); this.editingItem.set(null); }

  updateField(field: string, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  onImageFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile.set(file);
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removeImageFile() {
    this.selectedImageFile.set(null);
    this.imagePreview.set(null);
  }

  save() {
    if (!this.formData().title || !this.formData().issuer) { 
      this.message.set({ type: 'error', text: 'Name and issuer are required.' }); 
      return; 
    }
    this.saving.set(true);

    const saveData = { ...this.formData() };

    if (this.selectedImageFile()) {
      this.portfolioService.uploadImage(this.selectedImageFile()!, 'certificates').subscribe({
        next: (res: any) => {
          saveData.CertificateImage = res.url || res.path || res.data?.url;
          this._performSave(saveData);
        },
        error: () => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: 'Image upload failed.' });
        }
      });
    } else {
      this._performSave(saveData);
    }
  }

  private _performSave(saveData: Partial<ICertificate>) {
    const operation = this.editingItem()
      ? this.portfolioService.updateCertificate(this.editingItem()!._id!, saveData)
      : this.portfolioService.createCertificate(saveData);

    operation.subscribe({
      next: (result) => {
        const isEditing = !!this.editingItem();
        if (isEditing) {
          this.items.update(list => list.map(i => i._id === result._id ? result : i));
        } else {
          this.items.update(list => [...list, result]);
        }
        this.saving.set(false);
        this.closeModal();
        this.message.set({ type: 'success', text: `Certificate ${isEditing ? 'updated' : 'added'}!` });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => { this.saving.set(false); this.message.set({ type: 'error', text: 'Operation failed.' }); }
    });
  }

  delete(item: ICertificate) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    this.portfolioService.deleteCertificate(item._id!).subscribe({
      next: () => {
        this.items.update(list => list.filter(i => i._id !== item._id));
        this.message.set({ type: 'success', text: 'Deleted!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Delete failed.' })
    });
  }
}
