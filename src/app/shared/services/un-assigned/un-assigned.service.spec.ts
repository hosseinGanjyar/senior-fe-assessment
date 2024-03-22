import { TestBed } from '@angular/core/testing';

import { UnAssignedService } from './UnAssignedService';

describe('UnAssignedService', () => {
  let service: UnAssignedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnAssignedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
