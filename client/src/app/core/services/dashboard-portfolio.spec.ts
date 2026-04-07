import { TestBed } from '@angular/core/testing';

import { DashboardPortfolio } from './dashboard-portfolio';

describe('DashboardPortfolio', () => {
  let service: DashboardPortfolio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPortfolio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});