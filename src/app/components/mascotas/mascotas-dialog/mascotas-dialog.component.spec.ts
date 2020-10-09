import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasDialogComponent } from './mascotas-dialog.component';

describe('MascotasDialogComponent', () => {
  let component: MascotasDialogComponent;
  let fixture: ComponentFixture<MascotasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
