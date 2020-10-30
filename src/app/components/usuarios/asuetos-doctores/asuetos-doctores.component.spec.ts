import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsuetosDoctoresComponent } from './asuetos-doctores.component';

describe('AsuetosDoctoresComponent', () => {
  let component: AsuetosDoctoresComponent;
  let fixture: ComponentFixture<AsuetosDoctoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsuetosDoctoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsuetosDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
