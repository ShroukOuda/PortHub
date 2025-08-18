import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Ieducation } from '../../models/ieducation';


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = `${environment.apiUrl}/educations`;

  constructor(private http: HttpClient) {}

  getEducations(): Observable<Ieducation[]> {
    return this.http.get<Ieducation[]>(this.apiUrl);
  }

  getEducationsByPortfolioId(portfolioId: string): Observable<Ieducation[]> {
    return this.http.get<Ieducation[]>(`${this.apiUrl}/${portfolioId}`);
  }

  addEducation(education: Ieducation): Observable<Ieducation> {
    return this.http.post<Ieducation>(this.apiUrl, education);
  }

  updateEducation(id: string, education: Ieducation): Observable<Ieducation> {
    return this.http.put<Ieducation>(`${this.apiUrl}/${id}`, education);
  }

  deleteEducation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
