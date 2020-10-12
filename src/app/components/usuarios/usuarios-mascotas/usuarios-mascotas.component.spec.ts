import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMascotasComponent } from './usuarios-mascotas.component';

describe('UsuariosMascotasComponent', () => {
  let component: UsuariosMascotasComponent;
  let fixture: ComponentFixture<UsuariosMascotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosMascotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
