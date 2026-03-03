import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PortfolioDataService } from './portfolio-data.service';
import { environment } from '../../../../environments/environment';

describe('PortfolioDataService', () => {
  let service: PortfolioDataService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PortfolioDataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PortfolioDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load full portfolio data in a single call', () => {
    const userId = 'user123';
    const mockResponse = {
      user: { _id: userId, firstName: 'Test', lastName: 'User', email: 'test@test.com' },
      portfolio: { _id: 'port1', title: 'My Portfolio', template: 'developer', mainColor: '#e74c3c' },
      projects: [{ _id: 'proj1', title: 'Project 1' }],
      skills: [{ _id: 'skill1', name: 'Angular', level: 90 }],
      services: [],
      educations: [],
      experiences: [],
      certificates: [],
      testimonials: []
    };

    service.loadPortfolioData(userId).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.user!.firstName).toBe('Test');
      expect(data.portfolio!.title).toBe('My Portfolio');
      expect(data.projects.length).toBe(1);
      expect(data.skills.length).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/api/portfolios/user/${userId}/full`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when portfolio not found', () => {
    const userId = 'nonexistent';

    service.loadPortfolioData(userId).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/api/portfolios/user/${userId}/full`);
    req.flush({ message: 'User not found' }, { status: 404, statusText: 'Not Found' });
  });
});
