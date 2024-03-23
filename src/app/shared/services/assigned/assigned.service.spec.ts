import { TestBed } from '@angular/core/testing';

import { AssignedService } from './assigned.service';

describe('AssignedService', () => {
  let service: AssignedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
