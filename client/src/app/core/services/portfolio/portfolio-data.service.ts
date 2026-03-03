import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Iportfolio } from '../../models/iportfolio';
import { Iuser } from '../../models/iuser';
import { Iproject } from '../../models/iproject';
import { Iskill } from '../../models/iskill';
import { Iservice } from '../../models/iservice';
import { Ieducation } from '../../models/ieducation';
import { Iexperience } from '../../models/iexperience';
import { Itestimonial } from '../../models/itestimonial';
import { Icertificate } from '../../models/icertificate';
import { environment } from '../../../../environments/environment';

export interface PortfolioData {
  user: Iuser | null;
  portfolio: Iportfolio | null;
  projects: Iproject[];
  skills: Iskill[];
  services: Iservice[];
  educations: Ieducation[];
  experiences: Iexperience[];
  testimonials: Itestimonial[];
  certificates: Icertificate[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private apiUrl = environment.apiUrl;
  private initialState: PortfolioData = {
    user: null,
    portfolio: null,
    projects: [],
    skills: [],
    services: [],
    educations: [],
    experiences: [],
    testimonials: [],
    certificates: [],
    loading: false,
    error: null
  };

  private portfolioDataSubject = new BehaviorSubject<PortfolioData>(this.initialState);
  public portfolioData$ = this.portfolioDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadPortfolioData(userId: string): Observable<PortfolioData> {
    this.portfolioDataSubject.next({ ...this.initialState, loading: true });

    return this.http.get<any>(`${this.apiUrl}/api/portfolios/user/${userId}/full`).pipe(
      map(response => {
        const data: PortfolioData = {
          user: response.user || null,
          portfolio: response.portfolio || null,
          projects: response.projects || [],
          skills: response.skills || [],
          services: response.services || [],
          educations: response.educations || [],
          experiences: response.experiences || [],
          testimonials: response.testimonials || [],
          certificates: response.certificates || [],
          loading: false,
          error: null
        };
        this.portfolioDataSubject.next(data);
        return data;
      }),
      catchError(error => {
        const errorMessage = error?.error?.message || error?.message || 'Error loading portfolio data';
        const errorData: PortfolioData = {
          ...this.initialState,
          loading: false,
          error: errorMessage
        };
        this.portfolioDataSubject.next(errorData);
        return of(errorData);
      })
    );
  }

  get currentData(): PortfolioData {
    return this.portfolioDataSubject.value;
  }

  clearData(): void {
    this.portfolioDataSubject.next(this.initialState);
  }
}
