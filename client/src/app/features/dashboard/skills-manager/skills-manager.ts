import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { ISkill } from '../../../core/models/iskill';

@Component({
  selector: 'app-skills-manager',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './skills-manager.html',
  styleUrl: './skills-manager.css'
})
export class SkillsManagerComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);

  loading = signal(true);
  saving = signal(false);
  skills = signal<ISkill[]>([]);
  showModal = signal(false);
  editingItem = signal<ISkill | null>(null);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  formData = signal<Partial<ISkill>>({
    name: '',
    level: 80,
    category: 'Technical'
  });

  // Icon upload
  iconMode = signal<'url' | 'upload'>('url');
  selectedIconFile = signal<File | null>(null);
  iconPreview = signal<string | null>(null);

  categories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Frameworks', 'Other'];

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    this.portfolioService.getMySkills().subscribe({
      next: (items) => {
        this.skills.set(items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openAddModal() {
    this.editingItem.set(null);
    this.formData.set({ name: '', level: 80, category: 'Technical', icon: '' });
    this.iconMode.set('url');
    this.selectedIconFile.set(null);
    this.iconPreview.set(null);
    this.showModal.set(true);
  }

  openEditModal(item: ISkill) {
    this.editingItem.set(item);
    this.formData.set({ name: item.name, level: item.level, category: item.category, icon: item.icon || '' });
    this.iconMode.set('url');
    this.selectedIconFile.set(null);
    this.iconPreview.set(null);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingItem.set(null);
  }

  updateFormField(field: keyof ISkill, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  onIconFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedIconFile.set(file);
      const reader = new FileReader();
      reader.onload = () => this.iconPreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removeIconFile() {
    this.selectedIconFile.set(null);
    this.iconPreview.set(null);
  }

  save() {
    if (!this.formData().name) {
      this.message.set({ type: 'error', text: 'Please fill in required fields.' });
      return;
    }

    this.saving.set(true);
    this.message.set(null);

    const saveData = { ...this.formData() };

    if (this.selectedIconFile()) {
      this.portfolioService.uploadImage(this.selectedIconFile()!, 'skills').subscribe({
        next: (res: any) => {
          saveData.icon = res.url || res.path || res.data?.url;
          this._performSave(saveData);
        },
        error: () => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: 'Icon upload failed.' });
        }
      });
    } else {
      this._performSave(saveData);
    }
  }

  private _performSave(saveData: Partial<ISkill>) {
    if (this.editingItem()) {
      this.portfolioService.updateSkill(this.editingItem()!._id!, saveData).subscribe({
        next: (updated) => {
          this.skills.update(list => list.map(s => s._id === updated._id ? updated : s));
          this.saving.set(false);
          this.closeModal();
          this.message.set({ type: 'success', text: 'Skill updated successfully!' });
          setTimeout(() => this.message.set(null), 3000);
        },
        error: () => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: 'Failed to update skill.' });
        }
      });
    } else {
      this.portfolioService.createSkill(saveData).subscribe({
        next: (created) => {
          this.skills.update(list => [...list, created]);
          this.saving.set(false);
          this.closeModal();
          this.message.set({ type: 'success', text: 'Skill created successfully!' });
          setTimeout(() => this.message.set(null), 3000);
        },
        error: () => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: 'Failed to create skill.' });
        }
      });
    }
  }

  delete(item: ISkill) {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    this.portfolioService.deleteSkill(item._id!).subscribe({
      next: () => {
        this.skills.update(list => list.filter(s => s._id !== item._id));
        this.message.set({ type: 'success', text: 'Skill deleted successfully!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Failed to delete skill.' })
    });
  }

  getSkillsByCategory() {
    const grouped: { [key: string]: ISkill[] } = {};
    for (const skill of this.skills()) {
      const cat = skill.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill);
    }
    return grouped;
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.getSkillsByCategory());
  }
}
