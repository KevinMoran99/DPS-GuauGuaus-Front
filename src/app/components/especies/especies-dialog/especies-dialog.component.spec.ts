import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeciesDialogComponent } from './especies-dialog.component';

describe('EspeciesDialogComponent', () => {
  let component: EspeciesDialogComponent;
  let fixture: ComponentFixture<EspeciesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeciesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeciesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
