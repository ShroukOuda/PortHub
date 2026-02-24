import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, loginData);
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/logout`, {});
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in by verifying the presence of a token in localStorage
    return !!localStorage.getItem('token');
  }

  uploadProfile(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ path: string }>(`${this.apiUrl}/uploads/profile`, formData);
  }

  register(formData: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/register`, formData);
  }

  checkUsername(username: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/auth/check-username?username=${username}`);
  }

  checkEmail(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/auth/check-email?email=${email}`);
  }

  // Validate email format and domain
  validateEmail(email: string): Observable<{ valid: boolean; message: string }> {
    return this.http.get<{ valid: boolean; message: string }>(`${this.apiUrl}/auth/validate-email?email=${email}`);
  }

  // Validate phone number
  validatePhone(phone: string): Observable<{ valid: boolean; message: string }> {
    return this.http.get<{ valid: boolean; message: string }>(`${this.apiUrl}/auth/validate-phone?phone=${encodeURIComponent(phone)}`);
  }

  // Get OAuth user data after callback
  getOAuthUser(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/auth/oauth/user/${userId}`, { headers });
  }

  // OAuth login URLs
  getGoogleLoginUrl(): string {
    return `${this.apiUrl}/auth/google`;
  }

  getGitHubLoginUrl(): string {
    return `${this.apiUrl}/auth/github`;
  }

  // Initiate OAuth login
  loginWithGoogle(): void {
    window.location.href = this.getGoogleLoginUrl();
  }

  loginWithGitHub(): void {
    window.location.href = this.getGitHubLoginUrl();
  }
}
