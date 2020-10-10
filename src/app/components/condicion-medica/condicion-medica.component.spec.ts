import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionMedicaComponent } from './condicion-medica.component';

describe('CondicionMedicaComponent', () => {
  let component: CondicionMedicaComponent;
  let fixture: ComponentFixture<CondicionMedicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionMedicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
