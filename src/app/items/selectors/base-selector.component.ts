import { Injectable, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

export class CustomSelectorError {
    constructor(public hasError?: boolean, public errorMessage?: string) { }
}

@Injectable()
export abstract class BaseSelectorComponent {
    value: any;
    control: FormControl = new FormControl(this.value);
    formGroup: FormGroup;

    updateFormControl(formProperty: string, changes: SimpleChanges) {
        this.formGroup.controls[formProperty].setValue(
            changes.currentValue.currentValue
        );
    }

    validate(c: FormControl) {
        if (!this.control.value) {
            return { CustomSelectorError: new CustomSelectorError(true) };
        }
        return null;
    }

    propagateChange = (_: any) => {
        return;
    }

    writeValue(value: any): void {
        if (value) {
            this.control.setValue(value.eventName);
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        return;
    }

    onChange(event) {
        this.propagateChange(event.value);
    }
}
