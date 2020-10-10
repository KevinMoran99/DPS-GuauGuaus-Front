import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosMenuComponent } from './usuarios-menu.component';

describe('UsuariosMenuComponent', () => {
  let component: UsuariosMenuComponent;
  let fixture: ComponentFixture<UsuariosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
