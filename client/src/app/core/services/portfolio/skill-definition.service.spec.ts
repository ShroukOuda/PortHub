import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SkillDefinitionService } from './skill-definition.service';
import { environment } from '../../../../environments/environment';

describe('SkillDefinitionService', () => {
  let service: SkillDefinitionService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/api/skill-definitions`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkillDefinitionService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SkillDefinitionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all active skill definitions (public)', () => {
    const mockSkills = [
      { _id: '1', name: 'Angular', category: 'Frontend', isActive: true },
      { _id: '2', name: 'Node.js', category: 'Backend', isActive: true }
    ];

    service.getAll().subscribe(skills => {
      expect(skills.length).toBe(2);
      expect(skills[0].name).toBe('Angular');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockSkills);
  });

  it('should fetch categories', () => {
    const mockCategories = ['Frontend', 'Backend', 'DevOps'];

    service.getCategories().subscribe(cats => {
      expect(cats.length).toBe(3);
      expect(cats).toContain('Backend');
    });

    const req = httpMock.expectOne(`${apiUrl}/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should create a skill definition (admin)', () => {
    localStorage.setItem('token', 'admin-token');
    const newSkill = { name: 'React', category: 'Frontend' };

    service.create(newSkill).subscribe(skill => {
      expect(skill.name).toBe('React');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer admin-token');
    req.flush({ _id: '3', ...newSkill, isActive: true });
  });

  it('should update a skill definition (admin)', () => {
    localStorage.setItem('token', 'admin-token');

    service.update('1', { name: 'Angular 20' }).subscribe(skill => {
      expect(skill.name).toBe('Angular 20');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ _id: '1', name: 'Angular 20', category: 'Frontend', isActive: true });
  });

  it('should delete a skill definition (admin)', () => {
    localStorage.setItem('token', 'admin-token');

    service.delete('2').subscribe();

    const req = httpMock.expectOne(`${apiUrl}/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Deleted' });
  });
});
