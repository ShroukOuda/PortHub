import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Iportfolio } from '../../models/iportfolio';
import { Iuser } from '../../models/iuser';
import { Iproject } from '../../models/iproject';
import { Iskill } from '../../models/iskill';
import { Iservice } from '../../models/iservice';
import { Ieducation } from '../../models/ieducation';
import { Iexperience } from '../../models/iexperience';
import { Itestimonial } from '../../models/itestimonial';
import { Icertificate } from '../../models/icertificate';
import { PortfolioService } from './portfolio-service';
import { UserService } from '../user-service';
import { ProjectService } from './project-service';
import { SkillService } from './skill-service';
import { ServiceService } from './service-service';
import { EducationService } from './education-service';
import { ExperienceService } from './experience-service';
import { TestimonialService } from './testimonial-service';
import { CertificateService } from './certificate-service';

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

  constructor(
    private portfolioService: PortfolioService,
    private userService: UserService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private serviceService: ServiceService,
    private educationService: EducationService,
    private experienceService: ExperienceService,
    private testimonialService: TestimonialService,
    private certificateService: CertificateService
  ) {}

  loadPortfolioData(userId: string): Observable<PortfolioData> {
    this.portfolioDataSubject.next({ ...this.initialState, loading: true });

    return this.userService.getUserById(userId).pipe(
      switchMap(user => {
        return this.portfolioService.getPortfoliosByUserId(userId).pipe(
          switchMap(portfolios => {
            const portfolio = portfolios.length > 0 ? portfolios[0] : null;
            
            if (!portfolio || !portfolio._id) {
              const data: PortfolioData = {
                user,
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
              this.portfolioDataSubject.next(data);
              return of(data);
            }

            const portfolioId = portfolio._id;

            return forkJoin({
              projects: this.projectService.getProjectByPortfolioId(portfolioId).pipe(catchError(() => of([]))),
              skills: this.skillService.getSkillByPortfolioId(portfolioId).pipe(catchError(() => of([]))),
              services: this.serviceService.getServiceByPortfolioId(portfolioId).pipe(catchError(() => of([]))),
              educations: this.educationService.getEducationsByPortfolioId(portfolioId).pipe(catchError(() => of([]))),
              experiences: this.experienceService.getExperiencesByPortfolioId(portfolioId).pipe(catchError(() => of([]))),
              testimonials: this.testimonialService.getTestimonialByPortfolioId(portfolioId).pipe(catchError(() => of([]))),
              certificates: this.certificateService.getCertificatesByPortfolioId(portfolioId).pipe(catchError(() => of([])))
            }).pipe(
              map(portfolioItems => {
                const data: PortfolioData = {
                  user,
                  portfolio,
                  ...portfolioItems,
                  loading: false,
                  error: null
                };
                this.portfolioDataSubject.next(data);
                return data;
              })
            );
          })
        );
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
