import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsManager } from './skills-manager';

describe('SkillsManager', () => {
  let component: SkillsManager;
  let fixture: ComponentFixture<SkillsManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
