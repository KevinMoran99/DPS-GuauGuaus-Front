import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDialogComponent } from './citas-dialog.component';

describe('CitasDialogComponent', () => {
  let component: CitasDialogComponent;
  let fixture: ComponentFixture<CitasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
