import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { IProject } from '../../../core/models/iproject';

@Component({
  selector: 'app-projects-manager',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './projects-manager.html',
  styleUrl: './projects-manager.css'
})
export class ProjectsManagerComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);

  loading = signal(true);
  saving = signal(false);
  projects = signal<IProject[]>([]);
  showModal = signal(false);
  editingProject = signal<IProject | null>(null);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  formData = signal<Partial<IProject>>({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    technologies: [],
    featured: false
  });

  techInput = signal('');
  imageMode = signal<'url' | 'upload'>('url');
  imagePreview = signal<string | null>(null);
  selectedImageFile = signal<File | null>(null);

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading.set(true);
    this.portfolioService.getMyProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  openAddModal() {
    this.editingProject.set(null);
    this.formData.set({
      title: '',
      description: '',
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      technologies: [],
      featured: false
    });
    this.techInput.set('');
    this.imageMode.set('url');
    this.imagePreview.set(null);
    this.selectedImageFile.set(null);
    this.showModal.set(true);
  }

  openEditModal(project: IProject) {
    this.editingProject.set(project);
    this.formData.set({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl,
      technologies: [...(project.technologies || [])],
      featured: project.featured
    });
    this.techInput.set('');
    this.imageMode.set(project.imageUrl ? 'url' : 'url');
    this.imagePreview.set(null);
    this.selectedImageFile.set(null);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.editingProject.set(null);
  }

  updateFormField(field: keyof IProject, value: any) {
    this.formData.update(data => ({
      ...data,
      [field]: value
    }));
  }

  addTechnology() {
    const tech = this.techInput().trim();
    if (tech && !this.formData().technologies?.includes(tech)) {
      this.formData.update(data => ({
        ...data,
        technologies: [...(data.technologies || []), tech]
      }));
      this.techInput.set('');
    }
  }

  removeTechnology(tech: string) {
    this.formData.update(data => ({
      ...data,
      technologies: data.technologies?.filter(t => t !== tech) || []
    }));
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

  saveProject() {
    if (!this.formData().title || !this.formData().description) {
      this.message.set({ type: 'error', text: 'Please fill in required fields.' });
      return;
    }

    this.saving.set(true);
    this.message.set(null);

    const saveData = { ...this.formData() };

    // If file is selected, upload first then save
    if (this.selectedImageFile()) {
      this.portfolioService.uploadImage(this.selectedImageFile()!, 'projects').subscribe({
        next: (res: any) => {
          saveData.imageUrl = res.url || res.filePath || res.data?.url;
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

  private _performSave(saveData: Partial<IProject>) {
    if (this.editingProject()) {
      this.portfolioService.updateProject(this.editingProject()!._id!, saveData).subscribe({
        next: (updated) => {
          this.projects.update(list => 
            list.map(p => p._id === updated._id ? updated : p)
          );
          this.saving.set(false);
          this.closeModal();
          this.message.set({ type: 'success', text: 'Project updated successfully!' });
          setTimeout(() => this.message.set(null), 3000);
        },
        error: () => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: 'Failed to update project.' });
        }
      });
    } else {
      this.portfolioService.createProject(saveData).subscribe({
        next: (created) => {
          this.projects.update(list => [...list, created]);
          this.saving.set(false);
          this.closeModal();
          this.message.set({ type: 'success', text: 'Project created successfully!' });
          setTimeout(() => this.message.set(null), 3000);
        },
        error: () => {
          this.saving.set(false);
          this.message.set({ type: 'error', text: 'Failed to create project.' });
        }
      });
    }
  }

  deleteProject(project: IProject) {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    this.portfolioService.deleteProject(project._id!).subscribe({
      next: () => {
        this.projects.update(list => list.filter(p => p._id !== project._id));
        this.message.set({ type: 'success', text: 'Project deleted successfully!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: () => {
        this.message.set({ type: 'error', text: 'Failed to delete project.' });
      }
    });
  }
}
