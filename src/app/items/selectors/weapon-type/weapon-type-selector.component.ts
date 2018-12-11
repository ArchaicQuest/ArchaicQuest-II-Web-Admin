import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    forwardRef,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef
} from "@angular/core";


import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    FormBuilder
} from "@angular/forms";
import { ItemType } from "../../interfaces/item-type.interface";
import { Store, select } from "@ngrx/store";
import { ItemAppState } from "../../state/add-item.state";
import { getWeaponTypes } from "../../state/add-item.selector";
import { takeWhile } from "rxjs/operators";
import { GetWeaponTypes } from "../../state/add-item.actions";


export class CustomSelectorError {
    constructor(public hasError?: boolean, public errorMessage?: string) { }
}

@Component({
    selector: "app-weapon-type-selector",
    templateUrl: './weapon-type-selector.component.html',
    styleUrls: ["./weapon-type-selector.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WeaponTypeSelectorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => WeaponTypeSelectorComponent),
            multi: true
        }
    ]
})
export class WeaponTypeSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
    weaponTypeForm: FormGroup;
    componentActive = true;
    weaponTypes: ItemType[];
    @Input() control: FormGroup;
    @Input() placeholder = '';
    @Input() currentValue = '';
    @Input() isDisabled = false;

    weaponType: FormControl = new FormControl(this.currentValue);

    constructor(private store: Store<ItemAppState>, private fb: FormBuilder,  private changeDetector: ChangeDetectorRef) {
        this.weaponTypeForm = this.fb.group({
            weaponType: this.weaponType
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
        this.weaponTypeForm.patchValue({
            weaponType: changes.currentValue.currentValue
        });

        if (changes.isDisabled.currentValue) {
            this.weaponTypeForm.disable({
                emitEvent: true,
                onlySelf: true
            });
        } else {
            this.weaponTypeForm.enable({
                emitEvent: true,
                onlySelf: true
            });
        }

    }

    ngOnInit() {
        this.store.dispatch(new GetWeaponTypes());

        this.store
            .pipe(
                select(getWeaponTypes),
                takeWhile(() => this.componentActive)
            )
            .subscribe((weaponTypes: any) => {
                this.weaponTypes = weaponTypes;
                this.weaponType.updateValueAndValidity();
            });


    }

    validate(c: FormControl) {
        if (!this.weaponType.value) {
            return { CustomSelectorError: new CustomSelectorError(true) };
        }
        return null;
    }

    propagateChange = (_: any) => {
        return;
    }

    writeValue(value: any): void {
        if (value) {
            this.weaponType.setValue(value.eventName);
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        return;
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    onChange(event) {
        this.propagateChange(event.value);
    }

    setDisabledState(isDisabled: boolean): void {

        console.log("wtf", isDisabled)
        //    this.disabled = isDisabled;

        if (isDisabled) {
            this.weaponTypeForm.disable();
            this.weaponTypeForm.updateValueAndValidity();
        }
    }

}
