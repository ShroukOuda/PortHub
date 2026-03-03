import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user-service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/api/users`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch public stats', () => {
    const mockStats = { totalUsers: 50, totalPortfolios: 30, totalCountries: 10, countryCounts: [] };

    service.getStats().subscribe(stats => {
      expect(stats.totalUsers).toBe(50);
      expect(stats.totalPortfolios).toBe(30);
    });

    const req = httpMock.expectOne(`${apiUrl}/stats`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStats);
  });

  it('should fetch public users', () => {
    const mockUsers = [{ firstName: 'John', lastName: 'Doe' }];

    service.getPublicUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].firstName).toBe('John');
    });

    const req = httpMock.expectOne(`${apiUrl}/public`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user by ID', () => {
    const mockUser = { _id: '123', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' };

    service.getUserById('123').subscribe(user => {
      expect(user.firstName).toBe('Jane');
    });

    const req = httpMock.expectOne(`${apiUrl}/123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch current user profile', () => {
    const mockUser = { _id: '456', firstName: 'Me', email: 'me@example.com' };

    service.getMyProfile().subscribe(user => {
      expect(user.firstName).toBe('Me');
    });

    const req = httpMock.expectOne(`${apiUrl}/me`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update own profile', () => {
    const updateData = { bio: 'New bio', jobTitle: 'Developer' };
    const mockResponse = { message: 'Updated', user: { ...updateData, _id: '456' } };

    service.updateMyProfile(updateData).subscribe(res => {
      expect(res.user.bio).toBe('New bio');
    });

    const req = httpMock.expectOne(`${apiUrl}/me`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should delete a user', () => {
    service.deleteUser('789').subscribe();

    const req = httpMock.expectOne(`${apiUrl}/789`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
