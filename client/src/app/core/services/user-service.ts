import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../models/iuser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(this.apiUrl);
  }

  getPublicUsers(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(`${this.apiUrl}/public`);
  }

  getStats(): Observable<{ totalUsers: number; totalPortfolios: number; totalCountries: number; countryCounts: { country: string; count: number }[] }> {
    return this.http.get<{ totalUsers: number; totalPortfolios: number; totalCountries: number; countryCounts: { country: string; count: number }[] }>(`${this.apiUrl}/stats`);
  }

  getUserById(id: string): Observable<Iuser> {
    return this.http.get<Iuser>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, user: Partial<Iuser>): Observable<Iuser> {
    return this.http.put<Iuser>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Self-management methods
  getMyProfile(): Observable<Iuser> {
    return this.http.get<Iuser>(`${this.apiUrl}/me`);
  }

  updateMyProfile(profile: Partial<Iuser>): Observable<{ message: string; user: Iuser }> {
    return this.http.put<{ message: string; user: Iuser }>(`${this.apiUrl}/me`, profile);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/me/password`, {
      currentPassword,
      newPassword
    });
  }
}
