import { TestBed } from '@angular/core/testing';

import { KeepServiceService } from './keep-service.service';

describe('KeepServiceService', () => {
  let service: KeepServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
