import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosDoctoresComponent } from './horarios-doctores.component';

describe('HorariosDoctoresComponent', () => {
  let component: HorariosDoctoresComponent;
  let fixture: ComponentFixture<HorariosDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
