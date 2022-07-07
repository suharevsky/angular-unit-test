import { TestBed } from "@angular/core/testing";
import { FirstDependencyService } from "../first-dependency/first-dependency.service";
import { TestingService } from "./testing.service"

describe('TestingService version 3', () => {
    let service: TestingService;
    let firstDependencyService: FirstDependencyService;

    const fakeFirstDependencyService = jasmine.createSpyObj(['returnValue', 'initValue', 'initValue2'])

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TestingService,
                { provide: FirstDependencyService, useValue: fakeFirstDependencyService }
            ]
        })

        service = TestBed.inject(TestingService);
        firstDependencyService = TestBed.inject(FirstDependencyService);
        fakeFirstDependencyService.returnValue.and.returnValue("two");
        fakeFirstDependencyService.initValue2.calls.reset(); 
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

    it('method sayHi() should call dependency method initValue2', () => {
        service.sayHi("some text");
        expect(fakeFirstDependencyService.initValue2).toHaveBeenCalled();
        expect(fakeFirstDependencyService.initValue2).toHaveBeenCalledTimes(1);
        expect(fakeFirstDependencyService.initValue2).toHaveBeenCalledWith("some text");
    })
})