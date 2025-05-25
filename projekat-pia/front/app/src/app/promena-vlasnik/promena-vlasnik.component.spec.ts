import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaVlasnikComponent } from './promena-vlasnik.component';

describe('PromenaVlasnikComponent', () => {
  let component: PromenaVlasnikComponent;
  let fixture: ComponentFixture<PromenaVlasnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaVlasnikComponent]
    });
    fixture = TestBed.createComponent(PromenaVlasnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
