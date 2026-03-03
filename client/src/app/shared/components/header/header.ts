import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { IUser } from '../../../core/models/iuser';
import { environment } from '../../../../environments/environment';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private authState = inject(AuthStateService);
  private apiUrl = environment.apiUrl;
  
  isLoggedIn = signal(false);
  currentUser = signal<IUser | null>(null);
  mobileMenuOpen = signal(false);
  isScrolled = signal(false);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  ngOnInit() {
    this.authState.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn.set(loggedIn);
    });
    
    this.authState.currentUser$.subscribe(user => {
      this.currentUser.set(user);
    });
  }

  get isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }



  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  logout() {
    this.authState.logout();
    this.mobileMenuOpen.set(false);
  }

  getProfileImageUrl(): string | null {
    const user = this.currentUser();
    const pic = user?.profilePicture || user?.profileImage;
    if (!pic || pic === 'default-profile.png') return null;
    if (pic.startsWith('http')) return pic;
    return `${this.apiUrl}/${pic}`;
  }


}

