import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    forwardRef,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import { GetItemTypes } from "../../state/add-item.actions";
import { Store, select } from "@ngrx/store";
import { ItemAppState } from "../../state/add-item.state";
import { takeWhile } from "rxjs/operators";
import { ItemType } from "../../interfaces/item-type.interface";
import { getItemTypes } from "../../state/add-item.selector";
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormGroup,
    FormControl,
    NG_VALIDATORS,
    FormBuilder
} from "@angular/forms";


export class CustomSelectorError {
    constructor(public hasError?: boolean, public errorMessage?: string) { }
}

@Component({
    selector: "app-item-type-selector",
    templateUrl: './item-type-selector.component.html',
    styleUrls: ["./item-type-selector.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ItemTypeSelectorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ItemTypeSelectorComponent),
            multi: true
        }
    ]
})
export class ItemTypeSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
    itemTypeForm: FormGroup;
    componentActive = true;
    itemTypes: ItemType[];
    @Input() control: FormGroup;
    @Input() placeholder = '';
    @Input() currentValue = '';
    @Input() isDisabled = false;

    itemType: FormControl = new FormControl(this.currentValue);

    constructor(private store: Store<ItemAppState>, private fb: FormBuilder) {
        this.itemTypeForm = this.fb.group({
            itemType: this.itemType
        });
    }

    ngOnChanges(changes: SimpleChanges) {



        console.log(changes)
        this.itemTypeForm.patchValue({
            itemType: this.currentValue
        });
    }

    ngOnInit() {
        this.store.dispatch(new GetItemTypes());

        this.store
            .pipe(
                select(getItemTypes),
                takeWhile(() => this.componentActive)
            )
            .subscribe((itemTypes: any) => {
                this.itemTypes = itemTypes;
                this.itemType.updateValueAndValidity();
            });


    }

    validate(c: FormControl) {
        if (!this.itemType.value) {
            return { CustomSelectorError: new CustomSelectorError(true) };
        }
        return null;
    }

    propagateChange = (_: any) => {
        return;
    }

    writeValue(value: any): void {
        if (value) {
            this.itemType.setValue(value.eventName);
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
}
