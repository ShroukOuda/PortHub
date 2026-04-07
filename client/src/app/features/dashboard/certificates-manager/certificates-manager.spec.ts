import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesManager } from './certificates-manager';

describe('CertificatesManager', () => {
  let component: CertificatesManager;
  let fixture: ComponentFixture<CertificatesManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatesManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
