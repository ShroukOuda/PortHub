import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { MouseFollowDirective } from '../../../shared/directives/mouse-follow.directive';
import { DashboardPortfolioService } from '../../../core/services/dashboard-portfolio.service';
import { IPortfolioTheme, THEME_PRESETS, DEFAULT_THEME } from '../../../core/models/iportfolio-theme';

@Component({
  selector: 'app-theme-editor',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, FormsModule, MouseFollowDirective],
  templateUrl: './theme-editor.html',
  styleUrl: './theme-editor.css'
})
export class ThemeEditorComponent implements OnInit {
  private portfolioService = inject(DashboardPortfolioService);

  loading = signal(true);
  saving = signal(false);
  portfolioId = signal<string | null>(null);
  hasPortfolio = signal(false);

  themePresets = THEME_PRESETS;
  selectedPreset = signal<string | null>(null);

  currentTheme = signal<Partial<IPortfolioTheme>>({ ...DEFAULT_THEME });

  fontOptions = [
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Poppins, sans-serif', label: 'Poppins' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans' },
    { value: 'Playfair Display, serif', label: 'Playfair Display' },
    { value: 'Lora, serif', label: 'Lora' },
    { value: 'Source Code Pro, monospace', label: 'Source Code Pro' },
  ];

  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  ngOnInit() {
    this.loadPortfolio();
  }

  loadPortfolio() {
    this.loading.set(true);
    this.portfolioService.getMyPortfolio().subscribe({
      next: (portfolio) => {
        if (portfolio) {
          this.hasPortfolio.set(true);
          this.portfolioId.set(portfolio._id || null);
          if (portfolio.theme) {
            this.currentTheme.set({ ...DEFAULT_THEME, ...portfolio.theme });
          }
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  selectPreset(preset: typeof THEME_PRESETS[0]) {
    this.selectedPreset.set(preset.name);
    this.currentTheme.set({
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor,
      backgroundColor: preset.backgroundColor,
      textColor: preset.textColor,
      cardBackground: preset.cardBackground,
      fontFamily: preset.fontFamily
    });
  }

  updateColor(property: keyof IPortfolioTheme, value: string) {
    this.selectedPreset.set(null);
    this.currentTheme.update(theme => ({
      ...theme,
      [property]: value
    }));
  }

  updateFont(value: string) {
    this.selectedPreset.set(null);
    this.currentTheme.update(theme => ({
      ...theme,
      fontFamily: value
    }));
  }

  saveTheme() {
    if (!this.portfolioId()) {
      this.message.set({ type: 'error', text: 'Please create a portfolio first before customizing the theme.' });
      return;
    }

    this.saving.set(true);
    this.message.set(null);

    this.portfolioService.updatePortfolioTheme(this.portfolioId()!, this.currentTheme()).subscribe({
      next: () => {
        this.saving.set(false);
        this.message.set({ type: 'success', text: 'Theme saved successfully!' });
        setTimeout(() => this.message.set(null), 3000);
      },
      error: (error) => {
        this.saving.set(false);
        this.message.set({ type: 'error', text: 'Failed to save theme. Please try again.' });
      }
    });
  }

  resetToDefault() {
    this.selectedPreset.set(null);
    this.currentTheme.set({ ...DEFAULT_THEME });
  }
}
