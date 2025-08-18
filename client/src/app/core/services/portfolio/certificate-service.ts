import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Icertificate } from '../../models/icertificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private apiUrl = `${environment.apiUrl}/certificates`;

  constructor(private http: HttpClient) {}

  getCertificates(): Observable<Icertificate[]> {
    return this.http.get<Icertificate[]>(this.apiUrl);
  }

  getCertificatesByPortfolioId(portfolioId: string): Observable<Icertificate[]> {
    return this.http.get<Icertificate[]>(`${this.apiUrl}/${portfolioId}`);
  }

  addCertificate(certificate: Icertificate): Observable<Icertificate> {
    return this.http.post<Icertificate>(this.apiUrl, certificate);
  }

  updateCertificate(id: string, certificate: Icertificate): Observable<Icertificate> {
    return this.http.put<Icertificate>(`${this.apiUrl}/${id}`, certificate);
  }

  deleteCertificate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
