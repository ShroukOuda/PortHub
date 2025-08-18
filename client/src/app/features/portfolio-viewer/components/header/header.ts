import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
    constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path ;
  }
  hoverContact = false;
  menuOpen = false;


navLinks = [
  { path: '/home', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/education', label: 'Education' },
  { path: '/skills', label: 'Skills' },
  { path: '/experience', label: 'Experiences' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/certificates', label: 'Certificates' },
  { path: '/testimonials', label: 'Testimonials' },
];



}
