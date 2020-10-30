import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsuedocDialogComponent } from './asuedoc-dialog.component';

describe('AsuedocDialogComponent', () => {
  let component: AsuedocDialogComponent;
  let fixture: ComponentFixture<AsuedocDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsuedocDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsuedocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
