import { TestBed } from "@angular/core/testing";
import { CheckValueService } from "./check-value.service";

let service: CheckValueService;

describe('Service checks value', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CheckValueService,
            ]
        })

        service = TestBed.inject(CheckValueService);
    })
    it('Creates object', () => {
        expect(service).toBeTruthy();
    });

    it('Should check value', () => {
        const check = service.check();
        expect(check).toBeTrue();
    });
})