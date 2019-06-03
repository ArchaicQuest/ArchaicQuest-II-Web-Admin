import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    forwardRef,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    FormBuilder
} from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { BaseSelectorComponent } from 'src/app/items/selectors/base-selector.component';
import { Mob } from '../interfaces/mob.interface';
import { MobService } from '../mob.service';



@Component({
    selector: 'app-mob-selector',
    templateUrl: './mob-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MobSelectorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MobSelectorComponent),
            multi: true
        },
        FormBuilder
    ]
})
export class MobSelectorComponent extends BaseSelectorComponent
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
    componentActive = true;
    filteredMobs: Observable<Mob[]>;

    @Input() currentValue = '';
    @Output() sendMobToParent = new EventEmitter<Mob>();
    constructor(private fb: FormBuilder, private mobService: MobService) {
        super();

    }

    ngOnChanges(changes: SimpleChanges) {
        this.updateFormControl('search', changes);
    }

    ngOnInit() {

        this.formGroup = this.fb.group({
            search: this.control
        });

        this.filteredMobs = this.formGroup
            .get('search')
            .valueChanges.pipe(
                startWith(''),
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(name => {
                    if (typeof name !== 'string' || name == null) {
                        return;
                    }
                    return this.filterMobs(name);
                })
            );
    }

    private filterMobs(value: string): Observable<Mob[]> {
        return this.mobService.autocompleteMobs(value);
    }

    displayMobs(mob?: Mob): string | undefined {
        return mob != null ? mob.name : undefined;
    }

    addMob() {
        //  const newObj = Object.create(this.control.value);
        this.sendMobToParent.emit(this.control.value);
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }
}

