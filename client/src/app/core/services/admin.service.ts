import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/iuser';
import { IPortfolio } from '../models/iportfolio';

export interface AdminStats {
  totalUsers: number;
  totalPortfolios: number;
  totalProjects: number;
  totalSkills: number;
  totalViews: number;
  usersThisMonth: number;
  portfoliosThisMonth: number;
  publicPortfolioCount: number;
  privatePortfolioCount: number;
  recentUsers: IUser[];
  recentPortfolios: IPortfolio[];
  topPortfolios: any[];
  userGrowthData: { month: string; count: number }[];
  portfolioGrowthData: { month: string; count: number }[];
  platformViewHistory: { date: string; count: number }[];
  totalCountries: number;
  countryCounts: { country: string; count: number }[];
  genderCounts: { gender: string; count: number }[];
  jobTitleCounts: { jobTitle: string; count: number }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get admin dashboard stats
  getStats(): Observable<AdminStats> {
    return this.http.get<any>(`${this.apiUrl}/api/admin/stats`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data || response),
      catchError(() => of({
        totalUsers: 0,
        totalPortfolios: 0,
        totalProjects: 0,
        totalSkills: 0,
        totalViews: 0,
        usersThisMonth: 0,
        portfoliosThisMonth: 0,
        publicPortfolioCount: 0,
        privatePortfolioCount: 0,
        recentUsers: [],
        recentPortfolios: [],
        topPortfolios: [],
        userGrowthData: [],
        portfolioGrowthData: [],
        platformViewHistory: [],
        totalCountries: 0,
        countryCounts: [],
        genderCounts: [],
        jobTitleCounts: []
      }))
    );
  }

  // Get all users with optional filters
  getUsers(params?: { search?: string; status?: string; role?: string; page?: number; limit?: number }): Observable<PaginatedResponse<IUser>> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.role) httpParams = httpParams.set('role', params.role);
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());

    return this.http.get<any>(`${this.apiUrl}/api/admin/users`, {
      headers: this.getAuthHeaders(),
      params: httpParams
    }).pipe(
      map(response => response),
      catchError(() => of({ data: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } }))
    );
  }

  // Get all portfolios with optional filters
  getPortfolios(params?: { search?: string; page?: number; limit?: number }): Observable<PaginatedResponse<IPortfolio>> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());

    return this.http.get<any>(`${this.apiUrl}/api/admin/portfolios`, {
      headers: this.getAuthHeaders(),
      params: httpParams
    }).pipe(
      map(response => response),
      catchError(() => of({ data: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } }))
    );
  }

  // Toggle user status (activate/deactivate)
  toggleUserStatus(id: string): Observable<IUser> {
    return this.http.patch<any>(`${this.apiUrl}/api/admin/users/${id}/toggle-status`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  // Change user role
  changeUserRole(id: string, role: string): Observable<IUser> {
    return this.http.patch<any>(`${this.apiUrl}/api/admin/users/${id}/role`, { role }, {
      headers: this.getAuthHeaders()
    }).pipe(map(response => response.data || response));
  }

  // Delete user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/admin/users/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete portfolio
  deletePortfolio(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/admin/portfolios/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ===== Job Title CRUD =====

  getJobTitles(params?: { search?: string; page?: number; limit?: number }): Observable<PaginatedResponse<any>> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());

    return this.http.get<PaginatedResponse<any>>(`${this.apiUrl}/api/job-titles`, {
      headers: this.getAuthHeaders(),
      params: httpParams
    });
  }

  getActiveJobTitles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/job-titles/active`);
  }

  createJobTitle(data: { title: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/job-titles`, data, {
      headers: this.getAuthHeaders()
    });
  }

  updateJobTitle(id: string, data: { title: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/job-titles/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  deleteJobTitle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/job-titles/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  toggleJobTitleStatus(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/job-titles/${id}/toggle`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  // ===== Country CRUD =====

  getCountries(params?: { search?: string; page?: number; limit?: number }): Observable<PaginatedResponse<any>> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());

    return this.http.get<PaginatedResponse<any>>(`${this.apiUrl}/api/countries`, {
      headers: this.getAuthHeaders(),
      params: httpParams
    });
  }

  getActiveCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/countries/active`);
  }

  createCountry(data: { name: string; code: string; dialCode: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/countries`, data, {
      headers: this.getAuthHeaders()
    });
  }

  updateCountry(id: string, data: { name: string; code: string; dialCode: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/countries/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  deleteCountry(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/countries/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  toggleCountryStatus(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/countries/${id}/toggle`, {}, {
      headers: this.getAuthHeaders()
    });
  }
}
