import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-countries',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: './admin-countries.html',
  styleUrl: './admin-countries.css'
})
export class AdminCountriesComponent implements OnInit {
  private adminService = inject(AdminService);

  loading = signal(true);
  saving = signal(false);
  items = signal<any[]>([]);
  filteredItems = signal<any[]>([]);
  searchQuery = signal('');
  showModal = signal(false);
  editingItem = signal<any | null>(null);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);
  formData = signal<{ name: string; code: string; dialCode: string }>({ name: '', code: '', dialCode: '' });

  // Pagination
  currentPage = signal(1);
  pageSize = signal(20);
  totalItems = signal(0);
  totalPages = signal(0);

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    this.adminService.getCountries({
      search: this.searchQuery(),
      page: this.currentPage(),
      limit: this.pageSize()
    }).subscribe({
      next: (res) => {
        this.items.set(res.data);
        this.filteredItems.set(res.data);
        this.totalItems.set(res.pagination.total);
        this.totalPages.set(res.pagination.pages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSearch() {
    this.currentPage.set(1);
    this.loadItems();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadItems();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) pages.push(i);
    return pages;
  }

  openAddModal() {
    this.editingItem.set(null);
    this.formData.set({ name: '', code: '', dialCode: '' });
    this.showModal.set(true);
  }

  openEditModal(item: any) {
    this.editingItem.set(item);
    this.formData.set({ name: item.name, code: item.code, dialCode: item.dialCode });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingItem.set(null);
  }

  updateField(field: string, value: string) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  save() {
    const { name, code, dialCode } = this.formData();
    if (!name.trim() || !code.trim() || !dialCode.trim()) {
      this.message.set({ type: 'error', text: 'All fields are required.' });
      return;
    }
    this.saving.set(true);

    const operation = this.editingItem()
      ? this.adminService.updateCountry(this.editingItem()._id, this.formData())
      : this.adminService.createCountry(this.formData());

    operation.subscribe({
      next: () => {
        this.saving.set(false);
        this.closeModal();
        this.loadItems();
        this.message.set({ type: 'success', text: `Country ${this.editingItem() ? 'updated' : 'created'}!` });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: (err: any) => {
        this.saving.set(false);
        this.message.set({ type: 'error', text: err.error?.message || 'Operation failed.' });
      }
    });
  }

  toggleStatus(item: any) {
    this.adminService.toggleCountryStatus(item._id).subscribe({
      next: (updated) => {
        this.items.update(list => list.map(i => i._id === updated._id ? updated : i));
        this.filteredItems.update(list => list.map(i => i._id === updated._id ? updated : i));
      },
      error: () => this.message.set({ type: 'error', text: 'Toggle failed.' })
    });
  }

  deleteItem(item: any) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    this.adminService.deleteCountry(item._id).subscribe({
      next: () => {
        this.loadItems();
        this.message.set({ type: 'success', text: 'Deleted!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Delete failed.' })
    });
  }
}
