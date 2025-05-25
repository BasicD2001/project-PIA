import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiskoviComponent } from './spiskovi.component';

describe('SpiskoviComponent', () => {
  let component: SpiskoviComponent;
  let fixture: ComponentFixture<SpiskoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpiskoviComponent]
    });
    fixture = TestBed.createComponent(SpiskoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
