
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, inject, Pipe, PipeTransform, SimpleChange, SimpleChanges } from '@angular/core';
import { BaseSelectorComponent } from './base-selector.component';


export class MockBaseSelector extends BaseSelectorComponent {

    constructor(private fb: FormBuilder) {
        super();

        this.formGroup = this.fb.group({
            formControl: this.control
        });
    }
}

const mockBaseSelector = new MockBaseSelector(new FormBuilder);

describe('Base Selector', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                BrowserAnimationsModule,
                AppRoutingModule,
                HttpClientModule,
                SharedModule,
                ReactiveFormsModule,

            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });

    });


    it('should update control value', () => {

        const changes: SimpleChanges = {
            currentValue: {
                currentValue: 'New Value',
                previousValue: '',
                firstChange: true,
                isFirstChange: null
            },

        };
        mockBaseSelector.updateFormControl('formControl', changes);

        expect(mockBaseSelector.formGroup.controls['formControl'].value).toEqual('New Value');


    });

    it('should validate control as having error', () => {

        mockBaseSelector.control.setValue(null);
        mockBaseSelector.control.markAsDirty();
        mockBaseSelector.control.markAsTouched();

        const HasError = mockBaseSelector.validate(mockBaseSelector.control)

        expect(HasError.CustomSelectorError.hasError).toBeTruthy();

    });

    it('should validate control as having no error', () => {

        mockBaseSelector.control.setValue('some value');
        mockBaseSelector.control.markAsDirty();
        mockBaseSelector.control.markAsTouched();

        const HasError = mockBaseSelector.validate(mockBaseSelector.control);

        expect(HasError).toEqual(null);
    });


    it('should write value to control', () => {

        const mockevent = {
            eventName: 'hello'
        };
        mockBaseSelector.writeValue(mockevent);
        expect(mockBaseSelector.control.value).toEqual('hello');
    });

});





