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
    this.formData.set({ name: '', level: 80, category: 'Technical' });
    this.showModal.set(true);
  }

  openEditModal(item: ISkill) {
    this.editingItem.set(item);
    this.formData.set({ name: item.name, level: item.level, category: item.category });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingItem.set(null);
  }

  updateFormField(field: keyof ISkill, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  save() {
    if (!this.formData().name) {
      this.message.set({ type: 'error', text: 'Please fill in required fields.' });
      return;
    }

    this.saving.set(true);
    this.message.set(null);

    if (this.editingItem()) {
      this.portfolioService.updateSkill(this.editingItem()!._id!, this.formData()).subscribe({
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
      this.portfolioService.createSkill(this.formData()).subscribe({
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
