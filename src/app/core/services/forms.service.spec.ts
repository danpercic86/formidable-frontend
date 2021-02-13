import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormsService', () => {
    let service: FormsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FormsService],
        });
        service = TestBed.inject(FormsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have "get" method', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.get).toBeTruthy();
    });
});
