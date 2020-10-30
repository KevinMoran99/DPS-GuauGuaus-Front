import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoradocDialogComponent } from './horadoc-dialog.component';

describe('HoradocDialogComponent', () => {
  let component: HoradocDialogComponent;
  let fixture: ComponentFixture<HoradocDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoradocDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoradocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
