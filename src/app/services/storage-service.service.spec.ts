import { TestBed } from '@angular/core/testing';

import { UtilService } from './util-service.service';

describe('StorageServiceService', () => {
    let service: UtilService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UtilService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
