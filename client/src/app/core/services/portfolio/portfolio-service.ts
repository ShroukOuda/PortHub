import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Iportfolio } from '../../models/iportfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = `${environment.apiUrl}/portfolios`;

  constructor(private http: HttpClient) {}

  getPortfolios(): Observable<Iportfolio[]> {
    return this.http.get<Iportfolio[]>(this.apiUrl);
  }

  getPortfolioById(id: string): Observable<Iportfolio> {
    return this.http.get<Iportfolio>(`${this.apiUrl}/${id}`);
  }

  getPortfoliosByUserId(userId: string): Observable<Iportfolio[]> {
    return this.http.get<Iportfolio[]>(`${this.apiUrl}/user/${userId}`);
  }

  addPortfolio(portfolio: Iportfolio): Observable<Iportfolio> {
    return this.http.post<Iportfolio>(this.apiUrl, portfolio);
  }

  updatePortfolio(id: string, portfolio: Iportfolio): Observable<Iportfolio> {
    return this.http.put<Iportfolio>(`${this.apiUrl}/${id}`, portfolio);
  }

  deletePortfolio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
