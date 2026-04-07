import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationManager } from './education-manager';

describe('EducationManagerComponent', () => {
  let component: EducationManager;
  let fixture: ComponentFixture<EducationManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
