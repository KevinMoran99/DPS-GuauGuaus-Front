import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionMedicaDialogComponent } from './condicion-medica-dialog.component';

describe('CondicionMedicaDialogComponent', () => {
  let component: CondicionMedicaDialogComponent;
  let fixture: ComponentFixture<CondicionMedicaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionMedicaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionMedicaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
