import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { IExperience } from '../../../core/models/iexperience';

@Component({
  selector: 'app-experience-manager',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: "./experience-manager.html",
  styleUrls: ['../projects-manager/projects-manager.css', '../education-manager/education-manager.css', './experience-manager.css']
})
export class ExperienceManagerComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);

  loading = signal(true);
  saving = signal(false);
  items = signal<IExperience[]>([]);
  showModal = signal(false);
  editingItem = signal<IExperience | null>(null);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);
  formData = signal<Partial<IExperience>>({ title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' });

  ngOnInit() { this.loadItems(); }

  loadItems() {
    this.loading.set(true);
    this.portfolioService.getMyExperience().subscribe({
      next: (items) => { this.items.set(items); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  openAddModal() {
    this.editingItem.set(null);
    this.formData.set({ title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' });
    this.showModal.set(true);
  }

  openEditModal(item: IExperience) {
    this.editingItem.set(item);
    this.formData.set({ 
      title: item.title, 
      company: item.company, 
      location: item.location,
      startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
      endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
      current: item.current,
      description: item.description 
    });
    this.showModal.set(true);
  }

  closeModal() { this.showModal.set(false); this.editingItem.set(null); }

  updateField(field: string, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  save() {
    if (!this.formData().title || !this.formData().company) { 
      this.message.set({ type: 'error', text: 'Title and company are required.' }); 
      return; 
    }

    // Date validation: start date must be before end date
    if (this.formData().startDate && this.formData().endDate && !this.formData().current) {
      const start = new Date(this.formData().startDate as string);
      const end = new Date(this.formData().endDate as string);
      if (start >= end) {
        this.message.set({ type: 'error', text: 'Start date must be before end date.' });
        return;
      }
    }

    this.saving.set(true);

    const operation = this.editingItem()
      ? this.portfolioService.updateExperience(this.editingItem()!._id!, this.formData())
      : this.portfolioService.createExperience(this.formData());

    operation.subscribe({
      next: (result) => {
        if (this.editingItem()) {
          this.items.update(list => list.map(i => i._id === result._id ? result : i));
        } else {
          this.items.update(list => [...list, result]);
        }
        this.saving.set(false);
        this.closeModal();
        this.message.set({ type: 'success', text: `Experience ${this.editingItem() ? 'updated' : 'added'}!` });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => { this.saving.set(false); this.message.set({ type: 'error', text: 'Operation failed.' }); }
    });
  }

  delete(item: IExperience) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    this.portfolioService.deleteExperience(item._id!).subscribe({
      next: () => {
        this.items.update(list => list.filter(i => i._id !== item._id));
        this.message.set({ type: 'success', text: 'Deleted!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Delete failed.' })
    });
  }
}
