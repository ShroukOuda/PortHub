import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Itestimonial } from '../../models/itestimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = `${environment.apiUrl}/testimonials`;

  constructor(private http: HttpClient) {}

  getTestimonials(): Observable<Itestimonial[]> {
    return this.http.get<Itestimonial[]>(this.apiUrl);
  }

  getTestimonialByPortfolioId(portfolioId: string): Observable<Itestimonial[]> {
    return this.http.get<Itestimonial[]>(`${this.apiUrl}/portfolio/${portfolioId}`);
  }

  addTestimonial(testimonial: Itestimonial): Observable<Itestimonial> {
    return this.http.post<Itestimonial>(this.apiUrl, testimonial);
  }

  updateTestimonial(id: string, testimonial: Itestimonial): Observable<Itestimonial> {
    return this.http.put<Itestimonial>(`${this.apiUrl}/${id}`, testimonial);
  }

  deleteTestimonial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

  

