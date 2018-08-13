import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesMobileComponent } from './heroes-mobile.component';

describe('HeroesMobileComponent', () => {
  let component: HeroesMobileComponent;
  let fixture: ComponentFixture<HeroesMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
