import { TestBed } from '@angular/core/testing';

import { NewInsuranceServiceService } from './new-insurance-service.service';

describe('NewInsuranceServiceService', () => {
  let service: NewInsuranceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewInsuranceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
