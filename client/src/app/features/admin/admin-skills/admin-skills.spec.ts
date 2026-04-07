import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkills } from './admin-skills';

describe('AdminSkillsComponent', () => {
  let component: AdminSkills;
  let fixture: ComponentFixture<AdminSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
