import { TestBed } from "@angular/core/testing";
import { FirstDependencyService } from "../first-dependency/first-dependency.service";
import { TestingService } from "./testing.service"

describe('TestingService', () => {
    let service: TestingService;
    let firstDependencyService: FirstDependencyService;
    let firstDependencyServiceReturnValueSpy: jasmine.Spy<(index: number) => string>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TestingService]
        })

        service = TestBed.inject(TestingService);
        firstDependencyService = TestBed.inject(FirstDependencyService);
        // returns value by default
        firstDependencyServiceReturnValueSpy = spyOn(firstDependencyService, "returnValue").and.returnValue("two")
    });

    it("Object created", () => {
        expect(service).toBeDefined();
    })

    it('Returns array value by specified index - original function of the class', () => {
        const result = service.getValue(1);
        expect(result).toBe('two')
    })

    it('Returns array value by specified index - spyOn and callThrough', () => {
        firstDependencyServiceReturnValueSpy.and.callThrough();
        const result = service.getValue(1);
        expect(result).toBe('two')
    })

    it('Returns array value by specified index - spyOn and returnValue ', () => {
        firstDependencyServiceReturnValueSpy.and.returnValue("two");
        const result = service.getValue(1);
        expect(result).toBe('two')
    })

    it('Returns array value by specified index - spyOn and callFake ', () => {
        firstDependencyServiceReturnValueSpy.and.callFake(() => "one");
        const result = service.getValue(1);
        expect(result).toBe('one')
    })

    it('Returns value of array, by returning function getIndex', () => {
        spyOn(service, "getIndex").and.returnValue(1);
        const result = service.getValue(service.getIndex());
        expect(result).toBe('two')
    })
})