import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsManager } from './testimonials-manager';

describe('TestimonialsManager', () => {
  let component: TestimonialsManager;
  let fixture: ComponentFixture<TestimonialsManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialsManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
