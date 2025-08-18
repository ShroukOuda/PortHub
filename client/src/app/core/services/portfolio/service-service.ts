import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Iservice } from '../../models/iservice';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient) {}

  getServices(): Observable<Iservice[]> {
    return this.http.get<Iservice[]>(this.apiUrl);
  }

  getServiceByPortfolioId(portfolioId: string): Observable<Iservice[]> {
    return this.http.get<Iservice[]>(`${this.apiUrl}/portfolio/${portfolioId}`);
  }

  addService(service: Iservice): Observable<Iservice> {
    return this.http.post<Iservice>(this.apiUrl, service);
  }

  updateService(id: string, service: Iservice): Observable<Iservice> {
    return this.http.put<Iservice>(`${this.apiUrl}/${id}`, service);
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
