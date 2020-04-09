import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    forwardRef,
    OnChanges,
    SimpleChanges,
    AfterContentInit,
    ChangeDetectorRef,
    AfterViewChecked,
    AfterViewInit,
    AfterContentChecked
} from "@angular/core";

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    FormBuilder
} from "@angular/forms";
import { ItemType } from "../../interfaces/item-type.interface";
import { Store, select } from "@ngrx/store";
import { ItemAppState } from '../../state/add-item.state';
import { getWeaponTypes, getItemTypes, getItemSlotTypes } from '../../state/add-item.selector';
import { takeWhile, takeUntil, take } from 'rxjs/operators';
import { GetItemTypes, GetItemSlotTypes } from '../../state/add-item.actions';
import { BaseSelectorComponent } from '../base-selector.component';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
    selector: 'app-item-slot-selector',
    templateUrl: './item-slot-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ItemSlotSelectorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ItemSlotSelectorComponent),
            multi: true
        }
    ]
})
export class ItemSlotSelectorComponent extends BaseSelectorComponent
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterContentChecked {
    componentActive = true;
    itemSlots: ItemType[];
    @Input() currentValue = null;

    constructor(private store: Store<ItemAppState>, private fb: FormBuilder, private changeDetector: ChangeDetectorRef, ) {
        super();

        this.formGroup = this.fb.group({
            itemSlotType: this.control
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateFormControl('itemSlotType', changes);
    }

    ngOnInit() {
        this.store.dispatch(new GetItemSlotTypes());

        this.store
            .pipe(
                select(getItemSlotTypes),
                takeUntil(componentDestroyed(this))
            )
            .subscribe((itemSlots: any) => {
                this.itemSlots = itemSlots;

                this.control.setValue(this.currentValue);
                this.control.updateValueAndValidity();
                this.changeDetector.detectChanges();
            });
    }



    ngAfterContentChecked(): void {
        this.control.setValue(this.currentValue);

        this.control.updateValueAndValidity();

    }

    // ngAfterViewChecked(): void {
    //     setTimeout(() => {

    //         // this.control.setValue(this.currentValue);
    //         // this.formGroup.get('itemType').setValue(this.currentValue);
    //         this.control.updateValueAndValidity();
    //         // this.formGroup.get('itemType').updateValueAndValidity();
    //         //   this.changeDetector.markForCheck();
    //     });

    // }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.changeDetector.detach();
    }
}

