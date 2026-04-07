import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPortfolios } from './admin-portfolios';

describe('AdminPortfolios', () => {
  let component: AdminPortfolios;
  let fixture: ComponentFixture<AdminPortfolios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPortfolios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPortfolios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
