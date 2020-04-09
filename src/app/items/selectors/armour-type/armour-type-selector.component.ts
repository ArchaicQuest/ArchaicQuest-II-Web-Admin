import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    forwardRef,
    OnChanges,
    SimpleChanges,
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectorRef
} from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    FormBuilder
} from '@angular/forms';
import { ItemType } from '../../interfaces/item-type.interface';
import { Store, select } from '@ngrx/store';
import { ItemAppState } from '../../state/add-item.state';
import { getAttackTypes, getArmourTypes } from '../../state/add-item.selector';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { GetAttackTypes, GetArmourTypes } from '../../state/add-item.actions';
import { BaseSelectorComponent } from '../base-selector.component';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
    selector: 'app-armour-type-selector',
    templateUrl: './armour-type-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ArmourTypeSelectorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ArmourTypeSelectorComponent),
            multi: true
        }
    ]
})
export class ArmourTypeSelectorComponent extends BaseSelectorComponent
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterViewChecked {
    componentActive = true;
    armourTypes: ItemType[];
    @Input() currentValue = null;

    constructor(private store: Store<ItemAppState>, private fb: FormBuilder, private changeDetector: ChangeDetectorRef) {
        super();

        this.formGroup = this.fb.group({
            armourType: this.control
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateFormControl('armourType', changes);
    }

    ngOnInit() {
        this.store.dispatch(new GetArmourTypes());

        this.store
            .pipe(
                select(getArmourTypes),
                takeUntil(componentDestroyed(this))
            )
            .subscribe((armourTypes: any) => {
                this.armourTypes = armourTypes;


                this.control.setValue(this.currentValue);
                this.control.updateValueAndValidity();
                //    this.changeDetector.detectChanges();
            });
    }


    ngAfterViewChecked(): void {
        setTimeout(() => {

            this.control.updateValueAndValidity();
            // this.changeDetector.markForCheck();
        });

    }

    ngOnDestroy(): void {
        this.componentActive = false;

    }
}
