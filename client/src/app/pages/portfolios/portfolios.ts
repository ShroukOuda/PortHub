import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Iuser } from '../../core/models/iuser';
import { UserService } from '../../core/services/user-service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faUser, faEnvelope, faPhone, faMapMarkerAlt, faBriefcase, faUserSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolios',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './portfolios.html',
  styleUrl: './portfolios.css'
})
export class Portfolios implements OnInit {
  users: Iuser[] = [];
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
        console.log('Users fetched successfully:', users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    });
  }

  viewPortfolio(identifier: string): void {
    // Navigate to portfolio page - adjust route as needed
    this.router.navigate(['/portfolio', identifier]);
  }

  trackByUserId(index: number, user: Iuser): any {
    return user._id || user.email || index;
  }

  onImageError(event: any): void {
    // Hide broken image and show default icon
    event.target.style.display = 'none';
  }

  getInitials(user: Iuser): string {
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  getIcons() {
    return {
      email: faEnvelope,
      phone: faPhone,
      location: faMapMarkerAlt,
      briefcase: faBriefcase,
      user: faUser,
      userSlash: faUserSlash,
      users: faUsers
    };
  }
}