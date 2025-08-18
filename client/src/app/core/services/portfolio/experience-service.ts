import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Iexperience } from '../../models/iexperience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = `${environment.apiUrl}/experiences`;

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<Iexperience[]> {
    return this.http.get<Iexperience[]>(this.apiUrl);
  }

  getExperiencesByPortfolioId(portfolioId: string): Observable<Iexperience[]> {
    return this.http.get<Iexperience[]>(`${this.apiUrl}/${portfolioId}`);
  }

  addExperience(experience: Iexperience): Observable<Iexperience> {
    return this.http.post<Iexperience>(this.apiUrl, experience);
  }

  updateExperience(id: string, experience: Iexperience): Observable<Iexperience> {
    return this.http.put<Iexperience>(`${this.apiUrl}/${id}`, experience);
  }

  deleteExperience(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
