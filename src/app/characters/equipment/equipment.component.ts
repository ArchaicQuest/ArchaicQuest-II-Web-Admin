import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/items/add-item/add-item.service';
import { startWith, debounceTime, distinctUntilChanged, switchMap, takeWhile, take } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { getInventory } from '../state/character.selector';
import { CharacterAppState } from '../state/character.state';
import { GetInventory } from '../state/character.actions';
import { EqSlot } from './equipment.enum';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
})
export class EquipmentComponent implements OnInit, OnDestroy {
    componentActive = true;
    headItems: Item[] = [];
    wieldItems: Item[] = [];
    public formGroup = this.formBuilder.group({
        headEq: [''],
        wieldEq: ['']
    });
    inventory$: Observable<Item[]>
    constructor(
        private itemService: ItemService,
        private formBuilder: FormBuilder,
        private charStore: Store<CharacterAppState>,
    ) { }

    ngOnInit() {
        this.charStore.dispatch(new GetInventory());

        this.charStore
            .select(getInventory)
            .subscribe((inventory: Item[]) => {
                console.log(inventory);
                this.mapEquipmentDropDowns(inventory)
            });

    }

    resetEQArrays() {
        this.headItems = [];
    }


    updateEQArray(item: Item) {
        const eqItems = [];
        eqItems.push(item);

        return eqItems;
    }

    mapEquipmentDropDowns(items: Item[]) {
        this.resetEQArrays();

        items.forEach(item => {
            console.log(item.slot === EqSlot.Arms)
            switch (item.slot) {
                case EqSlot.Arms:
                    console.log('');
                    break;
                case EqSlot.Body:
                    console.log('');
                    break;
                case EqSlot.Face:
                    console.log('');
                    break;
                case EqSlot.Feet:
                    console.log('');
                    break;
                case EqSlot.Finger:
                    console.log('');
                    break;
                case EqSlot.Floating:
                    console.log('');
                    break;
                case EqSlot.Hands:
                    console.log('');
                    break;
                case EqSlot.Held:
                    console.log('');
                    break;
                case EqSlot.Head:
                    this.headItems = this.headItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Light:
                    console.log('');
                    break;
                case EqSlot.Legs:
                    console.log('');
                    break;
                case EqSlot.Neck:
                    console.log('');
                    break;
                case EqSlot.Shield:
                    console.log('');
                    break;
                case EqSlot.Torso:
                    console.log('');
                    break;
                case EqSlot.Waist:
                    console.log('');
                    break;
                case EqSlot.Wrist:
                    console.log('');
                    break;
                case EqSlot.Wielded:
                    this.wieldItems.push(item);
                    this.wieldItems = [...this.wieldItems];
                    break;
                default:
                    console.log(`item slot ${item.slot} is not found`);
            }
        });

    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }


}
