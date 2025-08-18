import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Iproject } from '../../models/iproject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Iproject[]> {
    return this.http.get<Iproject[]>(this.apiUrl);
  }

  getProjectByPortfolioId(portfolioId: string): Observable<Iproject[]> {
    return this.http.get<Iproject[]>(`${this.apiUrl}/portfolio/${portfolioId}`);
  }

  addProject(project: Iproject): Observable<Iproject> {
    return this.http.post<Iproject>(this.apiUrl, project);
  }

  updateProject(id: string, project: Iproject): Observable<Iproject> {
    return this.http.put<Iproject>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
