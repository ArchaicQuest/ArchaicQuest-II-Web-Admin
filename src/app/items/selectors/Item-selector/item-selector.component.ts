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
    FormBuilder,
    FormControl
} from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseSelectorComponent } from '../base-selector.component';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item.interface';
import { ItemService } from '../../add-item/add-item.service';
import { getItemTypes } from '../../state/add-item.selector';

@Component({
    selector: 'app-item-selector',
    templateUrl: './item-selector.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ItemSelectorComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ItemSelectorComponent),
            multi: true
        },
        FormBuilder
    ]
})
export class ItemSelectorComponent extends BaseSelectorComponent
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
    componentActive = true;
    filteredItems: Observable<Item[]>;

    @Input() currentValue = '';

    @Input() hideValue = false;
    @Output() sendItemToParent = new EventEmitter<Item>();
    constructor(private fb: FormBuilder, private itemService: ItemService,) {
        super();

    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
        // if (changes) {
        //     this.updateFormControl('itemSearch', changes);
        // }
    }

    ngOnInit() {

        this.formGroup = this.fb.group({
            itemSearch: this.control,
            value: [0]
        });

        this.filteredItems = this.formGroup
            .get('itemSearch')
            .valueChanges.pipe(
                startWith(''),
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(name => {
                    if (typeof name !== 'string' || name == null) {
                        return;
                    }
                    return this.filterItems(name);
                })
            );
    }

    private filterItems(value: string): Observable<Item[]> {
        return this.itemService.autocompleteItems(value);
    }

    displayItems(item?: Item): string | undefined {
        return item != null ? item.name : undefined;
    }

    addItem() {


        if (this.control.value.itemType === 14) {
            (this.control.value as Item).value = this.formGroup.get('value').value;
        }

        this.sendItemToParent.emit(this.control.value);
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }
}

