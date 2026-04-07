import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobTitles } from './admin-job-titles';

describe('AdminJobTitles', () => {
  let component: AdminJobTitles;
  let fixture: ComponentFixture<AdminJobTitles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminJobTitles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobTitles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
