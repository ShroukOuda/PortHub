import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountries } from './admin-countries';

describe('AdminCountries', () => {
  let component: AdminCountries;
  let fixture: ComponentFixture<AdminCountries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCountries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCountries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
