import { TestBed } from '@angular/core/testing';

import { AppointmentTypesService } from './appointment-types.service';

describe('AppointmentTypesService', () => {
  let service: AppointmentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
