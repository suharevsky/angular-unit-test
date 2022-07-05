import { TestBed } from "@angular/core/testing";
import { CheckValueService } from "./check-value.service";
import { SimpleService } from "./simple.service"

let service: SimpleService;

let fakeCheckValueService = { check: () => true }

describe('Simple service', () => {
    beforeEach(() => {
        service = new SimpleService(fakeCheckValueService);

        TestBed.configureTestingModule({
            providers: [
                SimpleService,
                { provide: CheckValueService, useValue: fakeCheckValueService }
            ]
        })

        service = TestBed.inject(SimpleService);
    })
    it('Creates object', () => {
        expect(service).toBeTruthy();
    });

    it('Sum two digits', () => {
        const sum = service.sum(1, 2);
        expect(sum).toBe(3);
    });

    it('Check should be true', () => {
        const check = service.check();
        expect(check).toBeTruthy();
    });

    it('Should return "undefined" if function has not second argument', () => {
        const sum = service.sum(1);
        expect(sum).toBeUndefined();
    });

    it('Should return "22" if function has not second argument', () => {
        const sum = service.sum(undefined,3);
        expect(sum).toBe(22);
    });
})