import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaDekoraterComponent } from './promena-dekorater.component';

describe('PromenaDekoraterComponent', () => {
  let component: PromenaDekoraterComponent;
  let fixture: ComponentFixture<PromenaDekoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaDekoraterComponent]
    });
    fixture = TestBed.createComponent(PromenaDekoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
