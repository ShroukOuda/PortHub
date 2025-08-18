import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<{ token: string }> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<{ token: string }>(url, loginData);
  }

  logout(): Observable<{ message: string }> {
    const url = `${environment.apiUrl}/auth/logout`;
    return this.http.post<{ message: string }>(url, {});
  }

  uploadProfile(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ path: string }>(`${environment.apiUrl}/upload/profile`, formData);
  }

  register(formData: FormData): Observable<{ message: string }> {
    const url = `${environment.apiUrl}/auth/register`;
    return this.http.post<{ message: string }>(url, formData);
  }

    checkUsername(username: string): Observable<{ exists: boolean }> {
    const url = `${environment.apiUrl}/auth/check-username?username=${username}`;
    return this.http.get<{ exists: boolean }>(url);
  }


  checkEmail(email: string): Observable<{ exists: boolean }> {
    const url = `${environment.apiUrl}/auth/check-email?email=${email}`;
    return this.http.get<{ exists: boolean }>(url);
  }
}
