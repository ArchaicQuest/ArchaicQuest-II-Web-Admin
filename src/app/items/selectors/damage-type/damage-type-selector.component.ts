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
import { getDamageTypes } from '../../state/add-item.selector';
import { takeWhile } from 'rxjs/operators';
import { GetDamageTypes } from '../../state/add-item.actions';
import { BaseSelectorComponent } from '../base-selector.component';

@Component({
    selector: 'app-damage-type-selector',
    templateUrl: './damage-type-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DamageTypeSelectorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DamageTypeSelectorComponent),
            multi: true
        }
    ]
})
export class DamageTypeSelectorComponent extends BaseSelectorComponent
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterContentInit {
    componentActive = true;
    damageTypes: ItemType[];
    @Input() currentValue = null;

    constructor(private store: Store<ItemAppState>, private fb: FormBuilder) {
        super();

        this.formGroup = this.fb.group({
            damageType: this.control
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateFormControl('damageType', changes);
    }

    ngOnInit() {
        this.store.dispatch(new GetDamageTypes());

        this.store
            .pipe(
                select(getDamageTypes),
                takeWhile(() => this.componentActive)
            )
            .subscribe((damageTypes: any) => {
                this.damageTypes = damageTypes;


                this.control.updateValueAndValidity();
            });
    }


    ngAfterContentInit(): void {
        setTimeout(() => {
            const selectedObj = this.damageTypes.find(x => x.id === this.currentValue);
            this.control.setValue(selectedObj);

            this.control.updateValueAndValidity();
        });

    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }
}

