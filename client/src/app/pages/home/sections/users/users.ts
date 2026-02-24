import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Iuser } from '../../../../core/models/iuser';
import { UserService } from '../../../../core/services/user-service';


@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit {
  users: Iuser[] = [];
  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPublicUsers().subscribe({
      next: (users) => {
        this.users = users.slice(0, 6);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getInitials(user: Iuser): string {
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase();
  }
}
