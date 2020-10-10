import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCitaDialogComponent } from './tipos-cita-dialog.component';

describe('TiposCitaDialogComponent', () => {
  let component: TiposCitaDialogComponent;
  let fixture: ComponentFixture<TiposCitaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposCitaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposCitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
