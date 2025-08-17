import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iuser } from '../../../../core/models/iuser';


@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users {
  users: Iuser[] = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      password: 'hashedPassword123',
      profilePicture: '',
      bio: 'Full-stack developer with 5+ years of experience in modern web technologies.',
      gender: 'male',
      dateOfBirth: '1990-05-15',
      country: 'United States',
      city: 'New York',
      address: '123 Main Street, Apartment 4B',
      role: 'user'
    },
    {
      _id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'janesmith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      password: 'hashedPassword456',
      profilePicture: 'jane-profile.jpg',
      bio: 'Creative UI/UX designer passionate about creating intuitive user experiences.',
      gender: 'female',
      dateOfBirth: '1992-08-22',
      country: 'Canada',
      city: 'Toronto',
      address: '456 Oak Avenue, Suite 12',
      role: 'user'
    },
    {
      _id: '3',
      firstName: 'Ali',
      lastName: 'Hassan',
      username: 'alihassan',
      email: 'ali.hassan@example.com',
      phone: '+201234567890',
      password: 'hashedPassword789',
      profilePicture: 'ali-profile.jpg',
      bio: 'Backend developer specializing in .NET and cloud systems.',
      gender: 'male',
      dateOfBirth: '1995-02-12',
      country: 'Egypt',
      city: 'Cairo',
      address: '78 Nile Street',
      role: 'user'
    },
    {
      _id: '4',
      firstName: 'Emily',
      lastName: 'Smith',
      username: 'emilysmith',
      email: 'emily.smith@example.com',
      phone: '+1234567890',
      password: 'hashedPassword789',
      profilePicture: 'emily-profile.jpg',
      bio: 'Graphic designer with a passion for creating stunning visuals.',
      gender: 'female',
      dateOfBirth: '1990-11-30',
      country: 'United Kingdom',
      city: 'London',
      address: '789 Elm Street',
      role: 'user'
    }
  ]

  getAge(dateOfBirth: string | Date): number {
    const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }


}
