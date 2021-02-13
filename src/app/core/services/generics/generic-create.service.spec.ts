import { TestBed } from '@angular/core/testing';

import { GenericCreateService } from './generic-create.service';

describe('GenericCreateService', () => {
    let service: GenericCreateService<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GenericCreateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
