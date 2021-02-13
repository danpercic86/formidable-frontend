import { TestBed } from '@angular/core/testing';

import { GenericBaseService } from './generic-base.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GenericBaseService', () => {
    let service: GenericBaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GenericBaseService],
        });
        service = TestBed.inject(GenericBaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
