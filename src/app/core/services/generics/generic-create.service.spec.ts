import { TestBed } from '@angular/core/testing';

import { GenericCreateService } from './generic-create.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Model } from '@models/base.model';

describe('GenericCreateService', () => {
    let service: GenericCreateService<TestModel>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GenericCreateService],
        });
        service = TestBed.inject(GenericCreateService) as GenericCreateService<TestModel>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have create function', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(service.create).toBeTruthy();
    });
});

interface TestModel extends Model {
    name: string;
}
