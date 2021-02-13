import { TestBed } from '@angular/core/testing';

import { GenericBaseService } from './generic-base.service';

describe('GenericBaseService', () => {
    let service: GenericBaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GenericBaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
