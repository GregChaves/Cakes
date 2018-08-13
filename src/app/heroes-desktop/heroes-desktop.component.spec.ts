import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesDesktopComponent } from './heroes-desktop.component';

describe('HeroesDesktopComponent', () => {
  let component: HeroesDesktopComponent;
  let fixture: ComponentFixture<HeroesDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
