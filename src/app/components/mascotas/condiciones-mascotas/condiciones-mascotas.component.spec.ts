import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesMascotasComponent } from './condiciones-mascotas.component';

describe('CondicionesMascotasComponent', () => {
  let component: CondicionesMascotasComponent;
  let fixture: ComponentFixture<CondicionesMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionesMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionesMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
