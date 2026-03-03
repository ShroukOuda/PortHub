import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth-service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request', () => {
    const loginData = { login: 'test@example.com', password: 'Password123!' };
    const mockResponse = { token: 'fake-jwt-token' };

    service.login(loginData).subscribe(res => {
      expect(res.token).toBe('fake-jwt-token');
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginData);
    req.flush(mockResponse);
  });

  it('should send register request with FormData', () => {
    const formData = new FormData();
    formData.append('firstName', 'Test');
    formData.append('email', 'test@example.com');

    service.register(formData).subscribe(res => {
      expect(res.message).toBe('User registered successfully');
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'User registered successfully' });
  });

  it('should check username availability', () => {
    service.checkUsername('testuser').subscribe(res => {
      expect(res.exists).toBe(false);
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/check-username?username=testuser`);
    expect(req.request.method).toBe('GET');
    req.flush({ exists: false });
  });

  it('should check email availability', () => {
    service.checkEmail('test@example.com').subscribe(res => {
      expect(res.exists).toBe(true);
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/check-email?email=test@example.com`);
    expect(req.request.method).toBe('GET');
    req.flush({ exists: true });
  });

  it('should return true for isLoggedIn when token exists', () => {
    localStorage.setItem('token', 'fake-token');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should return false for isLoggedIn when no token', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should upload profile image', () => {
    const file = new File(['test'], 'photo.png', { type: 'image/png' });

    service.uploadProfile(file).subscribe(res => {
      expect(res.path).toBe('uploads/profiles/photo.png');
    });

    const req = httpMock.expectOne(`${apiUrl}/uploads/profile`);
    expect(req.request.method).toBe('POST');
    req.flush({ path: 'uploads/profiles/photo.png' });
  });
});
