import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajCenaComponent } from './azuriraj-cena.component';

describe('AzurirajCenaComponent', () => {
  let component: AzurirajCenaComponent;
  let fixture: ComponentFixture<AzurirajCenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajCenaComponent]
    });
    fixture = TestBed.createComponent(AzurirajCenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
