import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BossAmmoComponent } from './boss-ammo.component';

describe('BossAmmoComponent', () => {
  let component: BossAmmoComponent;
  let fixture: ComponentFixture<BossAmmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossAmmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BossAmmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
