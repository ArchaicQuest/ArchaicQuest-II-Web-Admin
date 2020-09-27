import { Injectable, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
/* istanbul ignore next */
export class CustomSelectorError {
    constructor(public hasError?: boolean, public errorMessage?: string) { }
}

@Injectable()
export abstract class BaseSelectorComponent extends OnDestroyMixin {
    value: any;
    control: FormControl = new FormControl();
    formGroup: FormGroup;

    updateFormControl(formProperty: string, changes: SimpleChanges) {
        this.formGroup.controls[formProperty].setValue(
            changes.currentValue.currentValue
        );
    }
    /* istanbul ignore next */
    validate(c: FormControl) {
        if (this.control.value == null) {
            return { CustomSelectorError: new CustomSelectorError(true) };
        }
        return null;
    }
    /* istanbul ignore next */
    propagateChange = (_: any) => {
        return;
    }
    /* istanbul ignore next */
    writeValue(value: any): void {
        if (value != null) {
            this.control.setValue(value.eventName);
        }
    }
    /* istanbul ignore next */
    registerOnChange(fn: any): void {

        this.propagateChange = fn;
    }
    /* istanbul ignore next */
    registerOnTouched(fn: any): void {
        return;
    }
    /* istanbul ignore next */
    onChange(event) {
        this.propagateChange(event.value);
    }
}
