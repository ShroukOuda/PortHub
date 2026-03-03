import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { SkillDefinitionService, SkillDefinition } from '../../../core/services/portfolio/skill-definition.service';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './admin-skills.html',
  styleUrl: './admin-skills.css'
})
export class AdminSkillsComponent implements OnInit {
  private skillDefService = inject(SkillDefinitionService);

  loading = signal(true);
  skills = signal<SkillDefinition[]>([]);
  filteredSkills = signal<SkillDefinition[]>([]);
  searchQuery = signal('');
  categoryFilter = signal('all');
  categories = signal<string[]>([]);
  showModal = signal(false);
  editingItem = signal<SkillDefinition | null>(null);
  saving = signal(false);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  formData = signal<Partial<SkillDefinition>>({
    name: '',
    category: 'Technical',
    icon: ''
  });

  defaultCategories = ['Technical', 'Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Design', 'Soft Skills', 'Programming Languages', 'Data Science', 'Tools', 'Frameworks', 'Other'];

  get activeSkillsCount(): number {
    return this.skills().filter(s => s.isActive !== false).length;
  }

  ngOnInit() {
    this.loadSkills();
    this.loadCategories();
  }

  loadSkills() {
    this.loading.set(true);
    this.skillDefService.getAllAdmin().subscribe({
      next: (skills) => {
        this.skills.set(skills);
        this.applyFilters();
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadCategories() {
    this.skillDefService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats.length ? cats : this.defaultCategories)
    });
  }

  applyFilters() {
    let filtered = this.skills();
    const query = this.searchQuery().toLowerCase();
    if (query) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(query) || s.category?.toLowerCase().includes(query));
    }
    if (this.categoryFilter() !== 'all') {
      filtered = filtered.filter(s => s.category === this.categoryFilter());
    }
    this.filteredSkills.set(filtered);
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  onCategoryFilter(cat: string) {
    this.categoryFilter.set(cat);
    this.applyFilters();
  }

  openAddModal() {
    this.editingItem.set(null);
    this.formData.set({ name: '', category: 'Technical', icon: '' });
    this.showModal.set(true);
  }

  openEditModal(skill: SkillDefinition) {
    this.editingItem.set(skill);
    this.formData.set({ name: skill.name, category: skill.category, icon: skill.icon || '' });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingItem.set(null);
  }

  updateFormField(field: string, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  save() {
    if (!this.formData().name) {
      this.message.set({ type: 'error', text: 'Skill name is required.' });
      return;
    }
    this.saving.set(true);
    this.message.set(null);

    if (this.editingItem()) {
      this.skillDefService.update(this.editingItem()!._id!, this.formData()).subscribe({
        next: (updated) => {
          this.skills.update(list => list.map(s => s._id === updated._id ? updated : s));
          this.applyFilters();
          this.saving.set(false);
          this.closeModal();
          this.message.set({ type: 'success', text: 'Skill updated successfully!' });
          setTimeout(() => this.message.set(null), 3000);
        },
        error: (err) => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: err.error?.message || 'Failed to update skill.' });
        }
      });
    } else {
      this.skillDefService.create(this.formData()).subscribe({
        next: (created) => {
          this.skills.update(list => [...list, created]);
          this.applyFilters();
          this.saving.set(false);
          this.closeModal();
          this.message.set({ type: 'success', text: 'Skill created successfully!' });
          setTimeout(() => this.message.set(null), 3000);
        },
        error: (err) => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: err.error?.message || 'Failed to create skill.' });
        }
      });
    }
  }

  deleteSkill(skill: SkillDefinition) {
    if (!confirm(`Delete "${skill.name}"? This won't remove it from existing portfolios.`)) return;
    this.skillDefService.delete(skill._id!).subscribe({
      next: () => {
        this.skills.update(list => list.filter(s => s._id !== skill._id));
        this.applyFilters();
        this.message.set({ type: 'success', text: 'Skill deleted successfully!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Failed to delete skill.' })
    });
  }

  toggleActive(skill: SkillDefinition) {
    this.skillDefService.update(skill._id!, { isActive: !skill.isActive }).subscribe({
      next: (updated) => {
        this.skills.update(list => list.map(s => s._id === updated._id ? updated : s));
        this.applyFilters();
      }
    });
  }

  getSkillsByCategory(): { [key: string]: SkillDefinition[] } {
    const grouped: { [key: string]: SkillDefinition[] } = {};
    for (const skill of this.filteredSkills()) {
      const cat = skill.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill);
    }
    return grouped;
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.getSkillsByCategory()).sort();
  }
}
