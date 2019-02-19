
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestClass } from './test';



fdescribe('Testing test', () => {

  const Test = new TestClass();

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
            ],
            providers: [
               TestClass
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });

    });


    fit('should square number', () => {

        expect(Test.square(4)).toEqual(16);


    });


});





