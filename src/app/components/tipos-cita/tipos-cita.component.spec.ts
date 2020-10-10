import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposCitaComponent } from './tipos-cita.component';

describe('TiposCitaComponent', () => {
  let component: TiposCitaComponent;
  let fixture: ComponentFixture<TiposCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
