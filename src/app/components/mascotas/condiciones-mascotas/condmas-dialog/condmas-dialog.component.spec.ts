import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondmasDialogComponent } from './condmas-dialog.component';

describe('CondmasDialogComponent', () => {
  let component: CondmasDialogComponent;
  let fixture: ComponentFixture<CondmasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondmasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondmasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
