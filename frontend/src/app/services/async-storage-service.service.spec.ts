import { TestBed } from '@angular/core/testing';

import { AsyncStorageServiceService } from './async-storage-service.service';

describe('AsyncStorageServiceService', () => {
  let service: AsyncStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
