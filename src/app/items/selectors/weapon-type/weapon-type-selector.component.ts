import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    forwardRef,
    OnChanges,
    SimpleChanges,
    AfterContentInit
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
import { takeWhile } from 'rxjs/operators';
import { GetWeaponTypes } from '../../state/add-item.actions';
import { BaseSelectorComponent } from '../base-selector.component';

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
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterContentInit {
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
                takeWhile(() => this.componentActive)
            )
            .subscribe((weaponTypes: any) => {
                this.weaponTypes = weaponTypes;

                this.control.updateValueAndValidity();
            });
    }


    ngAfterContentInit(): void {
        setTimeout(() => {
            const selectedObj = this.weaponTypes.find(x => x.id === this.currentValue);
            this.control.setValue(selectedObj);

            this.control.updateValueAndValidity();
        });

    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }
}

