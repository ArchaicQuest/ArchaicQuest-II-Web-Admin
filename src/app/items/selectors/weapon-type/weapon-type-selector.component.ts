import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    forwardRef,
    OnChanges,
    SimpleChanges,
    AfterContentInit,
    AfterViewInit
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
import { getWeaponTypes } from '../../state/add-item.selector';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { GetWeaponTypes } from '../../state/add-item.actions';
import { BaseSelectorComponent } from '../base-selector.component';
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
    selector: 'app-weapon-type-selector',
    templateUrl: './weapon-type-selector.component.html',
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
export class WeaponTypeSelectorComponent extends BaseSelectorComponent
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterViewInit {
    componentActive = true;
    weaponTypes: ItemType[];
    @Input() currentValue = null;

    constructor(private store: Store<ItemAppState>, private fb: FormBuilder) {
        super();

        this.formGroup = this.fb.group({
            weaponType: this.control
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateFormControl('weaponType', changes);
    }

    ngOnInit() {
        this.store.dispatch(new GetWeaponTypes());

        this.store
            .pipe(
                select(getWeaponTypes),
                takeUntil(componentDestroyed(this))
            )
            .subscribe((weaponTypes: any) => {
                this.weaponTypes = weaponTypes;

                this.control.setValue(this.currentValue);
                this.control.updateValueAndValidity();
            });
    }


    ngAfterViewInit(): void {
        this.control.setValue(this.currentValue);

        this.control.updateValueAndValidity();

    }


    ngOnDestroy(): void {
        this.componentActive = false;
    }
}

