import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of, forkJoin, map, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPortfolio } from '../models/iportfolio';
import { IProject } from '../models/iproject';
import { ISkill } from '../models/iskill';
import { IService } from '../models/iservice';
import { IEducation } from '../models/ieducation';
import { IExperience } from '../models/iexperience';
import { ICertificate } from '../models/icertificate';
import { ITestimonial } from '../models/itestimonial';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardPortfolioService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private authState = inject(AuthStateService);

  // User's portfolio state
  private myPortfolioSubject = new BehaviorSubject<IPortfolio | null>(null);
  myPortfolio$ = this.myPortfolioSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get current user's portfolio
  getMyPortfolio(): Observable<IPortfolio | null> {
    this.loadingSubject.next(true);
    return this.http.get<any>(`${this.apiUrl}/api/portfolios/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        this.myPortfolioSubject.next(response.data || response);
        this.loadingSubject.next(false);
      }),
      map(response => response.data || response),
      catchError(error => {
        console.error('Error fetching portfolio:', error);
        this.loadingSubject.next(false);
        return of(null);
      })
    );
  }

  // Get user's portfolio stats (views, content distribution)
  getMyPortfolioStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/portfolios/my/stats`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response),
      catchError(() => of(null))
    );
  }

  // Create new portfolio
  createPortfolio(portfolio: Partial<IPortfolio>): Observable<IPortfolio> {
    // Map frontend fields to backend model fields
    // About field requires minimum 10 characters
    const aboutContent = portfolio.bio && portfolio.bio.length >= 10 
      ? portfolio.bio 
      : 'Welcome to my portfolio. I am excited to share my work and experience with you.';
    
    const payload = {
      title: portfolio.title,
      About: aboutContent,
      tagline: portfolio.tagline || '',
      bio: portfolio.bio || '',
      isPublic: portfolio.isPublic !== false,
      sociallinks: portfolio.socialLinks || {},
      theme: portfolio.theme,
      cvUrl: portfolio.cvUrl || ''
    };

    return this.http.post<any>(`${this.apiUrl}/api/portfolios`, payload, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        this.myPortfolioSubject.next(response.data || response);
      }),
      map(response => response.data || response)
    );
  }

  // Update portfolio
  updatePortfolio(id: string, portfolio: Partial<IPortfolio>): Observable<IPortfolio> {
    // Map frontend fields to backend model fields
    const aboutContent = portfolio.bio && portfolio.bio.length >= 10 
      ? portfolio.bio 
      : (portfolio.About || 'Welcome to my portfolio. I am excited to share my work and experience with you.');
    
    const payload = {
      title: portfolio.title,
      About: aboutContent,
      tagline: portfolio.tagline || '',
      bio: portfolio.bio || '',
      isPublic: portfolio.isPublic !== false,
      sociallinks: portfolio.socialLinks || portfolio.sociallinks || {},
      theme: portfolio.theme,
      cvUrl: portfolio.cvUrl || ''
    };

    return this.http.put<any>(`${this.apiUrl}/api/portfolios/${id}`, payload, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        this.myPortfolioSubject.next(response.data || response);
      }),
      map(response => response.data || response)
    );
  }

  // Update portfolio theme
  updatePortfolioTheme(id: string, theme: any): Observable<IPortfolio> {
    return this.http.patch<any>(`${this.apiUrl}/api/portfolios/${id}/theme`, { theme }, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(response => {
        this.myPortfolioSubject.next(response.data || response);
      }),
      map(response => response.data || response)
    );
  }

  // === Projects ===
  getMyProjects(): Observable<IProject[]> {
    return this.http.get<any>(`${this.apiUrl}/api/projects/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response || []),
      catchError(() => of([]))
    );
  }

  createProject(project: Partial<IProject>): Observable<IProject> {
    return this.http.post<any>(`${this.apiUrl}/api/projects`, project, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  updateProject(id: string, project: Partial<IProject>): Observable<IProject> {
    return this.http.put<any>(`${this.apiUrl}/api/projects/${id}`, project, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/projects/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // === Skills ===
  getMySkills(): Observable<ISkill[]> {
    return this.http.get<any>(`${this.apiUrl}/api/skills/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response || []),
      catchError(() => of([]))
    );
  }

  createSkill(skill: Partial<ISkill>): Observable<ISkill> {
    return this.http.post<any>(`${this.apiUrl}/api/skills`, skill, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  updateSkill(id: string, skill: Partial<ISkill>): Observable<ISkill> {
    return this.http.put<any>(`${this.apiUrl}/api/skills/${id}`, skill, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/skills/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // === Services ===
  getMyServices(): Observable<IService[]> {
    return this.http.get<any>(`${this.apiUrl}/api/services/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response || []),
      catchError(() => of([]))
    );
  }

  createService(service: Partial<IService>): Observable<IService> {
    return this.http.post<any>(`${this.apiUrl}/api/services`, service, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  updateService(id: string, service: Partial<IService>): Observable<IService> {
    return this.http.put<any>(`${this.apiUrl}/api/services/${id}`, service, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/services/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // === Education ===
  getMyEducation(): Observable<IEducation[]> {
    return this.http.get<any>(`${this.apiUrl}/api/educations/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response || []),
      catchError(() => of([]))
    );
  }

  createEducation(education: Partial<IEducation>): Observable<IEducation> {
    return this.http.post<any>(`${this.apiUrl}/api/educations`, education, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  updateEducation(id: string, education: Partial<IEducation>): Observable<IEducation> {
    return this.http.put<any>(`${this.apiUrl}/api/educations/${id}`, education, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  deleteEducation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/educations/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // === Experience ===
  getMyExperience(): Observable<IExperience[]> {
    return this.http.get<any>(`${this.apiUrl}/api/experiences/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response || []),
      catchError(() => of([]))
    );
  }

  createExperience(experience: Partial<IExperience>): Observable<IExperience> {
    return this.http.post<any>(`${this.apiUrl}/api/experiences`, experience, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  updateExperience(id: string, experience: Partial<IExperience>): Observable<IExperience> {
    return this.http.put<any>(`${this.apiUrl}/api/experiences/${id}`, experience, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  deleteExperience(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/experiences/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // === Certificates ===
  getMyCertificates(): Observable<ICertificate[]> {
    return this.http.get<any>(`${this.apiUrl}/api/certificates/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response || []),
      catchError(() => of([]))
    );
  }

  createCertificate(certificate: Partial<ICertificate>): Observable<ICertificate> {
    return this.http.post<any>(`${this.apiUrl}/api/certificates`, certificate, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  updateCertificate(id: string, certificate: Partial<ICertificate>): Observable<ICertificate> {
    return this.http.put<any>(`${this.apiUrl}/api/certificates/${id}`, certificate, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  deleteCertificate(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/certificates/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // === Testimonials ===
  getMyTestimonials(): Observable<ITestimonial[]> {
    return this.http.get<any>(`${this.apiUrl}/api/testimonials/my`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response || []),
      catchError(() => of([]))
    );
  }

  createTestimonial(testimonial: Partial<ITestimonial>): Observable<ITestimonial> {
    return this.http.post<any>(`${this.apiUrl}/api/testimonials`, testimonial, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  updateTestimonial(id: string, testimonial: Partial<ITestimonial>): Observable<ITestimonial> {
    return this.http.put<any>(`${this.apiUrl}/api/testimonials/${id}`, testimonial, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  deleteTestimonial(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/testimonials/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Load all portfolio data at once
  loadAllMyData(): Observable<{
    portfolio: IPortfolio | null;
    projects: IProject[];
    skills: ISkill[];
    services: IService[];
    education: IEducation[];
    experience: IExperience[];
    certificates: ICertificate[];
    testimonials: ITestimonial[];
  }> {
    this.loadingSubject.next(true);
    return forkJoin({
      portfolio: this.getMyPortfolio(),
      projects: this.getMyProjects(),
      skills: this.getMySkills(),
      services: this.getMyServices(),
      education: this.getMyEducation(),
      experience: this.getMyExperience(),
      certificates: this.getMyCertificates(),
      testimonials: this.getMyTestimonials()
    }).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        throw error;
      })
    );
  }
}
