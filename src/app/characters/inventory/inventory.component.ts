import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/items/add-item/add-item.service';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AddToInventory } from '../state/character.actions';
import { CharacterAppState } from '../state/character.state';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
    inventoryItems: Item[] = [];
    filteredItems: Observable<Item[]>;

    public formGroup = this.formBuilder.group({
        selectInventoryItem: [''],
        inventoryGP: ['', [Validators.min(0), Validators.max(10000)]]
    });
    constructor(
        private itemService: ItemService,
        private formBuilder: FormBuilder,
        private charStore: Store<CharacterAppState>,
    ) { }

    ngOnInit() {
        this.filteredItems = this.formGroup
            .get('selectInventoryItem')
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

    addItemToInventory() {
        const item = this.formGroup.get('selectInventoryItem').value;
        if (item == null) {
            return;
        }

        this.inventoryItems = this.inventoryItems.concat(item);

        this.charStore.dispatch(new AddToInventory(item));
    }

    private filterItems(value: string): Observable<Item[]> {
        return this.itemService.autocompleteItems(value);
    }

    displayItems(item?: Item): string | undefined {
        return item != null ? item.name : undefined;
    }
    removeItemFromInventory(index: number) {
        this.inventoryItems.splice(index, 1);
    }

}
