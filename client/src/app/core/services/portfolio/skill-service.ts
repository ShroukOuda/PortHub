import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Iskill } from '../../models/iskill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}/skills`;

  constructor(private http: HttpClient) {}

  getSkills(): Observable<Iskill[]> {
    return this.http.get<Iskill[]>(this.apiUrl);
  }

  getSkillByPortfolioId(portfolioId: string): Observable<Iskill[]> {
    return this.http.get<Iskill[]>(`${this.apiUrl}/portfolio/${portfolioId}`);
  }

  addSkill(skill: Iskill): Observable<Iskill> {
    return this.http.post<Iskill>(this.apiUrl, skill);
  }

  updateSkill(id: string, skill: Iskill): Observable<Iskill> {
    return this.http.put<Iskill>(`${this.apiUrl}/${id}`, skill);
  }

  deleteSkill(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
