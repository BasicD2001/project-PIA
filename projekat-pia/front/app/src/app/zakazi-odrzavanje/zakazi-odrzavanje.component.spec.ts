import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakaziOdrzavanjeComponent } from './zakazi-odrzavanje.component';

describe('ZakaziOdrzavanjeComponent', () => {
  let component: ZakaziOdrzavanjeComponent;
  let fixture: ComponentFixture<ZakaziOdrzavanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZakaziOdrzavanjeComponent]
    });
    fixture = TestBed.createComponent(ZakaziOdrzavanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
