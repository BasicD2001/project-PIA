import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraviLoginComponent } from './pravi-login.component';

describe('PraviLoginComponent', () => {
  let component: PraviLoginComponent;
  let fixture: ComponentFixture<PraviLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PraviLoginComponent]
    });
    fixture = TestBed.createComponent(PraviLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
