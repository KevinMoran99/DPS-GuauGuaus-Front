import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarioDialogComponent } from './tipo-usuario-dialog.component';

describe('TipoUsuarioDialogComponent', () => {
  let component: TipoUsuarioDialogComponent;
  let fixture: ComponentFixture<TipoUsuarioDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoUsuarioDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
