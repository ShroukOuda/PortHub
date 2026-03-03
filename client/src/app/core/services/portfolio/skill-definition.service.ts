import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface SkillDefinition {
  _id?: string;
  name: string;
  category: string;
  icon?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillDefinitionService {
  private apiUrl = `${environment.apiUrl}/api/skill-definitions`;
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Public: get all active skill definitions
  getAll(): Observable<SkillDefinition[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data || res || []),
      catchError(() => of([]))
    );
  }

  // Public: get categories
  getCategories(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/categories`).pipe(
      map(res => res.data || res || []),
      catchError(() => of([]))
    );
  }

  // Admin: get all including inactive
  getAllAdmin(params?: { search?: string; category?: string }): Observable<SkillDefinition[]> {
    let url = `${this.apiUrl}/admin`;
    const queryParts: string[] = [];
    if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
    if (params?.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
    if (queryParts.length) url += '?' + queryParts.join('&');

    return this.http.get<any>(url, { headers: this.getAuthHeaders() }).pipe(
      map(res => res.data || res || []),
      catchError(() => of([]))
    );
  }

  // Admin: create
  create(skill: Partial<SkillDefinition>): Observable<SkillDefinition> {
    return this.http.post<any>(this.apiUrl, skill, { headers: this.getAuthHeaders() }).pipe(
      map(res => res.data || res)
    );
  }

  // Admin: update
  update(id: string, skill: Partial<SkillDefinition>): Observable<SkillDefinition> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, skill, { headers: this.getAuthHeaders() }).pipe(
      map(res => res.data || res)
    );
  }

  // Admin: delete
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
