import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { IService } from '../../../core/models/iservice';


@Component({
  selector: 'app-services-manager',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: "./services-manager.html",
  styleUrls: ['../projects-manager/projects-manager.css', './services-manager.css']
})
export class ServicesManagerComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);

  loading = signal(true);
  saving = signal(false);
  items = signal<IService[]>([]);
  showModal = signal(false);
  editingItem = signal<IService | null>(null);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);
  formData = signal<Partial<IService>>({ title: '', description: '' });

  ngOnInit() { this.loadItems(); }

  loadItems() {
    this.loading.set(true);
    this.portfolioService.getMyServices().subscribe({
      next: (items) => { this.items.set(items); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  openAddModal() {
    this.editingItem.set(null);
    this.formData.set({ title: '', description: '' });
    this.showModal.set(true);
  }

  openEditModal(item: IService) {
    this.editingItem.set(item);
    this.formData.set({ title: item.title, description: item.description });
    this.showModal.set(true);
  }

  closeModal() { this.showModal.set(false); this.editingItem.set(null); }

  updateField(field: string, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  save() {
    if (!this.formData().title) { this.message.set({ type: 'error', text: 'Title is required.' }); return; }
    this.saving.set(true);

    // Sync name and title for backward compatibility
    const saveData = { ...this.formData(), name: this.formData().title };

    const operation = this.editingItem()
      ? this.portfolioService.updateService(this.editingItem()!._id!, saveData)
      : this.portfolioService.createService(saveData);

    operation.subscribe({
      next: (result) => {
        if (this.editingItem()) {
          this.items.update(list => list.map(i => i._id === result._id ? result : i));
        } else {
          this.items.update(list => [...list, result]);
        }
        this.saving.set(false);
        this.closeModal();
        this.message.set({ type: 'success', text: `Service ${this.editingItem() ? 'updated' : 'created'}!` });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => { this.saving.set(false); this.message.set({ type: 'error', text: 'Operation failed.' }); }
    });
  }

  delete(item: IService) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    this.portfolioService.deleteService(item._id!).subscribe({
      next: () => {
        this.items.update(list => list.filter(i => i._id !== item._id));
        this.message.set({ type: 'success', text: 'Deleted!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Delete failed.' })
    });
  }

}
