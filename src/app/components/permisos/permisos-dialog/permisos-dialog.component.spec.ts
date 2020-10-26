import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosDialogComponent } from './permisos-dialog.component';

describe('PermisosDialogComponent', () => {
  let component: PermisosDialogComponent;
  let fixture: ComponentFixture<PermisosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
