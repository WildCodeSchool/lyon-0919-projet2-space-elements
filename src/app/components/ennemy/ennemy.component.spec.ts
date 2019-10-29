import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnnemyComponent } from './ennemy.component';

describe('EnnemyComponent', () => {
  let component: EnnemyComponent;
  let fixture: ComponentFixture<EnnemyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnnemyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnnemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
