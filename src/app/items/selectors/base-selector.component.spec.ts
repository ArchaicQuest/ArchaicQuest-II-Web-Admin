
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

xdescribe('Base Selector', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MockBaseSelector],
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

        const fixture = TestBed.createComponent(MockBaseSelector);

        //  fixture.componentInstance.propagateChange({});

        fixture.componentInstance.updateFormControl('formControl', changes);

        fixture.detectChanges();

        expect(mockBaseSelector.formGroup.controls['formControl'].value).toEqual('New Value');


    });

    // it('should validate control as having error', () => {

    //     const fixture = TestBed.createComponent(MockBaseSelector);


    //     fixture.componentInstance.control.setValue(null);
    //     fixture.componentInstance.control.markAsDirty();
    //     fixture.componentInstance.control.markAsTouched();
    //     fixture.detectChanges();


    //     const HasError = fixture.componentInstance.validate(mockBaseSelector.control);
    //     fixture.detectChanges();
    //     expect(HasError.CustomSelectorError.hasError).toBeTruthy();

    // });

    // it('should validate control as having no error', () => {

    //     mockBaseSelector.control.setValue('some value');
    //     mockBaseSelector.control.markAsDirty();
    //     mockBaseSelector.control.markAsTouched();

    //     const HasError = mockBaseSelector.validate(mockBaseSelector.control);

    //     expect(HasError).toEqual(null);
    // });


    // it('should write value to control', () => {

    //     const mockevent = {
    //         eventName: 'hello'
    //     };
    //     mockBaseSelector.writeValue(mockevent);
    //     expect(mockBaseSelector.control.value).toEqual('hello');
    // });


    // it('should propagate chnage!?', () => {

    //     const fixture = TestBed.createComponent(MockBaseSelector);

    //     console.log(fixture.componentInstance.propagateChange({}));

    //     expect(fixture.componentInstance.propagateChange({})).toEqual(null);

    // });
});





