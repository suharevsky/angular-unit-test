import { TestBed } from "@angular/core/testing";
import { FirstDependencyService } from "../first-dependency/first-dependency.service";
import { TestingService } from "./testing.service"

describe('TestingService version 2', () => {
    let service: TestingService;
   // let firstDependencyService: FirstDependencyService;

    const fakeFirstDependencyService = {
        returnValue: jasmine.createSpy("returnValue"),
        initValue: jasmine.createSpy("initValue"), 
        initValue2: jasmine.createSpy("initValue2"), 
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TestingService,
                { provide: FirstDependencyService, useValue: fakeFirstDependencyService }
            ]
        })

        service = TestBed.inject(TestingService);
       // firstDependencyService = TestBed.inject(FirstDependencyService);
        fakeFirstDependencyService.returnValue.and.returnValue("two")
    });

    it('returns value of array by specified index', () => {
        const result = service.getValue(1);
        expect(result).toBe("two");
    })

    it('returns value of array by specified index 0', () => {
        fakeFirstDependencyService.returnValue.and.returnValue("one")
        const result = service.getValue(0);
        expect(result).toBe("one");
    })

    xit('returns value of array by specified index 0', () => {
        fakeFirstDependencyService.returnValue.and.callThrough()
        const result = service.getValue(0);
        expect(result).toBe("one");
    })
})