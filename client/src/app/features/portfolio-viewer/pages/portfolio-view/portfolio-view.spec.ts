import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioView } from './portfolio-view';

describe('PortfolioView', () => {
  let component: PortfolioView;
  let fixture: ComponentFixture<PortfolioView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
