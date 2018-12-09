import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild, ElementRef, Renderer2, forwardRef, DoCheck } from '@angular/core';
import { GetItemTypes } from '../state/add-item.actions';
import { Store, select } from '@ngrx/store';
import { ItemAppState } from '../state/add-item.state';
import { takeWhile } from 'rxjs/operators';
import { ItemType } from '../interfaces/item-type.interface';
import { getItemTypes } from '../state/add-item.selector';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { CanUpdateErrorState } from '@angular/material/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';


@Component({
    selector: 'app-item-type-selector',
    templateUrl: './item-type-selector.component.html',
    styleUrls: ['./item-type-selector.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ItemTypeSelectorComponent),
        multi: true,
    }]
})
export class ItemTypeSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor {

    constructor(private store: Store<ItemAppState>, private _renderer: Renderer2) { }
    componentActive = true;
    itemTypes: ItemType[];
    stateChanges = new Subject<void>();
    errorState = false;

    @Input() control: FormGroup;
    @Input() placeholder = '';
    @Input() hasError = '';

    @Output() selectedItemType = new EventEmitter<ItemType>();

    @ViewChild('dataSelect') private _dataSelect: ElementRef;
    get dataSelect(): ElementRef {
        return this._dataSelect;
    }

    private _onChange = (_: any) => { };
    private _onTouched = () => { };

    setTouched(event): void {
        this.control.markAsTouched();

        this.control.validator(event.value);

        this.errorState = this.control.invalid;

        this.stateChanges.next();
    }



    writeValue(obj: any): void {
        this._dataSelect = obj;
    }
    registerOnChange(fn: any): void {
        //        this._onChange = fn;
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    propagateChange = (value: number) => { };

    setDisabledState?(isDisabled: boolean): void {
        this._renderer.setProperty(this._dataSelect.nativeElement, 'disabled', isDisabled);
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
            });
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    onChange(event) {
        this.selectedItemType.emit(event.value);
        this._onChange(event.value);
        this.propagateChange(event.value);

    }

    onBlur(event: any) {
        this.selectedItemType.emit(event.value);
        this.propagateChange(event.value);
        this._onTouched();
        this.setTouched(event.value);

    }



}
