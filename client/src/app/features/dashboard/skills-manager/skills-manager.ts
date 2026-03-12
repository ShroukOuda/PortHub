import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { SkillDefinitionService, SkillDefinition } from '../../../core/services/portfolio/skill-definition.service';
import { ISkill } from '../../../core/models/iskill';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-skills-manager',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: './skills-manager.html',
  styleUrl: './skills-manager.css'
})
export class SkillsManagerComponent implements OnInit, OnDestroy {
  private portfolioService = inject(DashboardPortfolioService);
  private skillDefService = inject(SkillDefinitionService);
  private apiUrl = environment.apiUrl;

  loading = signal(true);
  saving = signal(false);
  skills = signal<ISkill[]>([]);
  availableSkills = signal<SkillDefinition[]>([]);
  showModal = signal(false);
  editingItem = signal<ISkill | null>(null);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);
  searchQuery = signal('');

  // Icon preview
  iconPreviewUrl = signal<string | null>(null);
  iconPreviewError = signal(false);
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  formData = signal<Partial<ISkill>>({
    name: '',
    level: 80,
    category: 'Technical'
  });

  ngOnInit() {
    this.loadItems();
    this.loadAvailableSkills();
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

  loadAvailableSkills() {
    this.skillDefService.getAll().subscribe({
      next: (skills) => this.availableSkills.set(skills)
    });
  }

  getFilteredAvailableSkills(): SkillDefinition[] {
    const query = this.searchQuery().toLowerCase();
    const existingNames = this.skills().map(s => s.name.toLowerCase());
    return this.availableSkills()
      .filter(s => !existingNames.includes(s.name.toLowerCase()))
      .filter(s => !query || s.name.toLowerCase().includes(query) || s.category?.toLowerCase().includes(query));
  }

  getAvailableCategories(): string[] {
    const cats = new Set(this.getFilteredAvailableSkills().map(s => s.category || 'Other'));
    return Array.from(cats).sort();
  }

  getSkillsForCategory(category: string): SkillDefinition[] {
    return this.getFilteredAvailableSkills().filter(s => (s.category || 'Other') === category);
  }

  openAddModal() {
    this.editingItem.set(null);
    this.searchQuery.set('');
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingItem.set(null);
  }

  selectSkill(skillDef: SkillDefinition) {
    this.saving.set(true);
    const newSkill: Partial<ISkill> = {
      name: skillDef.name,
      level: 80,
      category: skillDef.category,
      icon: skillDef.icon
    };

    this.portfolioService.createSkill(newSkill).subscribe({
      next: (created) => {
        this.skills.update(list => [...list, created]);
        this.saving.set(false);
        this.message.set({ type: 'success', text: `${skillDef.name} added!` });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => {
        this.saving.set(false);
        this.message.set({ type: 'error', text: 'Failed to add skill.' });
      }
    });
  }

  updateLevel(skill: ISkill, level: number) {
    this.portfolioService.updateSkill(skill._id!, { level }).subscribe({
      next: (updated) => {
        this.skills.update(list => list.map(s => s._id === updated._id ? updated : s));
      }
    });
  }

  delete(item: ISkill) {
    if (!confirm(`Remove "${item.name}" from your skills?`)) return;

    this.portfolioService.deleteSkill(item._id!).subscribe({
      next: () => {
        this.skills.update(list => list.filter(s => s._id !== item._id));
        this.message.set({ type: 'success', text: 'Skill removed!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => this.message.set({ type: 'error', text: 'Failed to remove skill.' })
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
    return Object.keys(this.getSkillsByCategory()).sort();
  }

  /** Get CDN icon URL for a skill name */
  getSkillIconUrl(name: string): string {
    if (!name) return '';
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\s+/g, '');
    return `https://cdn.simpleicons.org/${slug}`;
  }

  /** Called when the search query changes in the modal — debounce icon preview */
  updateIconPreview(skillName: string) {
    this.iconPreviewError.set(false);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    if (!skillName.trim()) {
      this.iconPreviewUrl.set(null);
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.iconPreviewUrl.set(this.getSkillIconUrl(skillName));
    }, 300);
  }

  onIconPreviewError() {
    this.iconPreviewError.set(true);
  }

  ngOnDestroy() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }
}
