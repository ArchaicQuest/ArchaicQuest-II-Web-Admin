import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/items/add-item/add-item.service';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AddToInventory, RemoveFromInventory, DecreaseArmour, RemoveEquipment } from '../state/character.actions';
import { CharacterAppState } from '../state/character.state';
import { v4 } from 'uuid';
import { getInventory } from '../state/character.selector';
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

        this.charStore
            .select(getInventory)
            .subscribe((inventory: Item[]) => {
                console.log(inventory);
                this.inventoryItems = inventory;
            });
    }

    addItemToInventory() {
        const item: Item = this.formGroup.get('selectInventoryItem').value;
        if (item == null) {
            return;
        }
        this.inventoryItems = this.inventoryItems.concat(item);



        this.charStore.dispatch(new AddToInventory(item));

        this.formGroup.get('selectInventoryItem').reset();
    }

    private filterItems(value: string): Observable<Item[]> {
        return this.itemService.autocompleteItems(value);
    }

    displayItems(item?: Item): string | undefined {
        return item != null ? item.name : undefined;
    }
    removeItemFromInventory(index: number) {

        const item: Item = this.inventoryItems[index];

        this.charStore.dispatch(new RemoveEquipment({
            slot: item.slot,
            item: null
        }));


        // const deletedItem:Item = this.inventoryItems.splice(index, 1);
        //let AC = this.inventoryItems.splice(index, 1)[0].armourRating.armour;
        //console.log("AC to remove,", AC)
        this.charStore.dispatch(new RemoveFromInventory(index));
        //  this.charStore.dispatch(new DecreaseArmour(AC));


    }

}
