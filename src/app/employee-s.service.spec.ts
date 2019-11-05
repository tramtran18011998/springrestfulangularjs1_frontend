import { TestBed } from '@angular/core/testing';

import { EmployeeSService } from './employee-s.service';

describe('EmployeeSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeSService = TestBed.get(EmployeeSService);
    expect(service).toBeTruthy();
  });
});
