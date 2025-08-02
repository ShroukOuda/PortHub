import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iusers } from '../../../../core/models/iusers';


@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users {
  users: Iusers[] = [
      {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1-555-0123",
    bio: "Full-stack developer passionate about creating innovative web solutions.",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    address: "123 Tech Street, San Francisco, CA",
    gender: "Female",
    age: 28,
    image: "https://i.pravatar.cc/150?img=32",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1-555-0124",
    bio: "UI/UX Designer with 5+ years of experience in creating beautiful digital experiences.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=687&q=80",
    address: "456 Design Ave, New York, NY",
    gender: "Male",
    age: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=687&q=80",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "+1-555-0125",
    bio: "DevOps Engineer specializing in cloud infrastructure and automation.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1170&q=80",
    address: "789 Cloud Street, Seattle, WA",
    gender: "Female",
    age: 29,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1170&q=80",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"]
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@example.com",
    phone: "+1-555-0126",
    bio: "Data Scientist turning complex data into actionable business insights.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1170&q=80",
    address: "321 Data Drive, Boston, MA",
    gender: "Male",
    age: 35,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1170&q=80",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"]
  },
  {
    id: 5,
    name: "Aisha Karim",
    email: "aisha.karim@example.com",
    phone: "+1-555-0127",
    bio: "Frontend developer crafting accessible and responsive web interfaces.",
    avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=870&q=80",
    address: "101 Interface Blvd, Austin, TX",
    gender: "Female",
    age: 26,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=870&q=80",
    skills: ["HTML", "CSS", "JavaScript", "Angular"]
  },
  {
    id: 6,
    name: "Liam Nguyen",
    email: "liam.nguyen@example.com",
    phone: "+1-555-0128",
    bio: "Mobile app developer with expertise in Flutter and cross-platform solutions.",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=870&q=80",
    address: "202 Mobile Lane, Denver, CO",
    gender: "Male",
    age: 30,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=870&q=80",
    skills: ["Flutter", "Dart", "Firebase", "UI Design"]
  }
  ]

}
