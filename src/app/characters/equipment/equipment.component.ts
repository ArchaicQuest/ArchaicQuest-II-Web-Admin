import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/items/add-item/add-item.service';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getInventory } from '../state/character.selector';
import { CharacterAppState } from '../state/character.state';
import { GetInventory, AddToEquipment, RemoveFromInventory, RemoveFromEquipment, AddToInventory, IncreaseArmour } from '../state/character.actions';
import { EqSlot } from './equipment.enum';
import { Equipment } from '../interfaces/equipment.interface';
@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
})
export class EquipmentComponent implements OnInit, OnDestroy {
    componentActive = true;
    itemId = 0;
    armsItems: Item[] = [];
    bodyItems: Item[] = [];
    faceItems: Item[] = [];
    feetItems: Item[] = [];
    fingerItems: Item[] = [];
    floatingItems: Item[] = [];
    handsItems: Item[] = [];
    heldItems: Item[] = [];
    legsItems: Item[] = [];
    lightItems: Item[] = [];
    neckItems: Item[] = [];
    shieldItems: Item[] = [];
    torsoItems: Item[] = [];
    waistItems: Item[] = [];
    wristItems: Item[] = [];
    headItems: Item[] = [];
    wieldItems: Item[] = [];
    public formGroup = this.formBuilder.group({
        armsEq: [''],
        bodyEq: [''],
        faceEq: [''],
        feetEq: [''],
        fingerEq: [''],
        finger2Eq: [''],
        floatingEq: [''],
        handsEq: [''],
        heldEq: [''],
        legsEq: [''],
        lightEq: [''],
        neckEq: [''],
        neck2Eq: [''],
        shieldEq: [''],
        torsoEq: [''],
        waistEq: [''],
        wristEq: [''],
        wrist2Eq: [''],
        headEq: [''],
        sheathedEq: [''],
        wieldEq: ['']
    });
    inventory$: Observable<Item[]>;
    constructor(
        private itemService: ItemService,
        private formBuilder: FormBuilder,
        private charStore: Store<CharacterAppState>,
    ) { }

    ngOnInit() {

        this.charStore
            .select(getInventory)
            .subscribe((inventory: Item[]) => {

                console.log(inventory);

                console.log("change")

            });

        this.charStore.select(x => x.character.mob.inventory).subscribe(x => {
            this.mapEquipmentDropDowns(x);
        });

        this.onEQChange();

    }

    private resetEQArrays() {
        this.headItems = [];
        this.armsItems = [];
        this.bodyItems = [];
        this.faceItems = [];
        this.feetItems = [];
        this.fingerItems = [];
        this.floatingItems = [];
        this.handsItems = [];
        this.heldItems = [];
        this.lightItems = [];
        this.legsItems = [];
        this.neckItems = [];
        this.shieldItems = [];
        this.torsoItems = [];
        this.waistItems = [];
        this.wristItems = [];
        this.wieldItems = [];
    }


    private updateEQArray(item: Item) {

        const eqItems = [];
        eqItems.push(item);
        return eqItems;
    }

    private mapEquipmentDropDowns(items: Item[]) {
        this.resetEQArrays();


        items.forEach(item => {
            this.heldItems = this.heldItems.concat((this.updateEQArray(item)));

            switch (item.slot) {
                case EqSlot.Arms:
                    this.armsItems = this.armsItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Body:
                    this.bodyItems = this.bodyItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Face:
                    this.faceItems = this.faceItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Feet:
                    this.feetItems = this.feetItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Finger:
                    this.fingerItems = this.fingerItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Floating:
                    this.floatingItems = this.floatingItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Hands:
                    this.handsItems = this.handsItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Held:
                    this.heldItems = this.headItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Head:
                    this.headItems = this.headItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Light:
                    this.lightItems = this.lightItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Legs:
                    this.legsItems = this.legsItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Neck:
                    this.neckItems = this.neckItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Shield:
                    this.shieldItems = this.shieldItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Torso:
                    this.torsoItems = this.torsoItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Waist:
                    this.waistItems = this.waistItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Wrist:
                    this.wristItems = this.wristItems.concat(this.updateEQArray(item));
                    break;
                case EqSlot.Wielded:
                    this.wieldItems = this.wieldItems.concat(this.updateEQArray(item));
                    break;
                default:
                    console.log(`item slot ${item.slot} is not found`);
            }
        });

    }

    private resetEQDupe(itemSlot: string, itemUuid: string) {
        if (this.formGroup.get(itemSlot).value !== null && this.formGroup.get(itemSlot).value.uuid === itemUuid) {
            this.formGroup.get(itemSlot).reset();
        }
    }

    onEQChange(): void {
        this.formGroup.valueChanges.subscribe((val: Equipment) => {

        });
    }

    sheathChange(selection) {
        this.resetEQDupe('wieldEq', selection.value.uuid);
        this.resetEQDupe('heldEq', selection.value.uuid);
    }

    wieldChange(selection) {
        this.resetEQDupe('sheathedEq', selection.value.uuid);
        this.resetEQDupe('heldEq', selection.value.uuid);
    }

    heldChange(selection) {
        this.resetEQDupe('armsEq', selection.value.uuid);
        this.resetEQDupe('bodyEq', selection.value.uuid);
        this.resetEQDupe('faceEq', selection.value.uuid);
        this.resetEQDupe('feetEq', selection.value.uuid);
        this.resetEQDupe('fingerEq', selection.value.uuid);
        this.resetEQDupe('finger2Eq', selection.value.uuid);
        this.resetEQDupe('floatingEq', selection.value.uuid);
        this.resetEQDupe('handsEq', selection.value.uuid);
        this.resetEQDupe('legsEq', selection.value.uuid);
        this.resetEQDupe('lightEq', selection.value.uuid);
        this.resetEQDupe('neckEq', selection.value.uuid);
        this.resetEQDupe('neck2Eq', selection.value.uuid);
        this.resetEQDupe('shieldEq', selection.value.uuid);
        this.resetEQDupe('torsoEq', selection.value.uuid);
        this.resetEQDupe('waistEq', selection.value.uuid);
        this.resetEQDupe('wristEq', selection.value.uuid);
        this.resetEQDupe('wrist2Eq', selection.value.uuid);
        this.resetEQDupe('headEq', selection.value.uuid);
        this.resetEQDupe('sheathedEq', selection.value.uuid);
        this.resetEQDupe('wieldEq', selection.value.uuid);
    }

    headChange(selection) {
        this.resetEQDupe('heldEq', selection.value.uuid);
    }

    fingerChange(selection) {
        this.resetEQDupe('finger2Eq', selection.value.uuid);
        this.resetEQDupe('heldEq', selection.value.uuid);
    }

    finger2Change(selection) {
        this.resetEQDupe('fingerEq', selection.value.uuid);
        this.resetEQDupe('heldEq', selection.value.uuid);
    }

    neckChange(selection) {
        this.resetEQDupe('neck2Eq', selection.value.uuid);
        this.resetEQDupe('heldEq', selection.value.uuid);
    }

    neck2Change(selection) {
        this.resetEQDupe('neckEq', selection.value.uuid);
        this.resetEQDupe('heldEq', selection.value.uuid);
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    compareOptions(obj: Item, obj2: Item): boolean {

        if (obj != null && obj2 != null) {
            return obj.uuid === obj2.uuid;
        }

        return false;
    }

    isInventoryEmpty() {
        return (this.armsItems.length === 0 &&
            this.bodyItems.length === 0 &&
            this.faceItems.length === 0 &&
            this.feetItems.length === 0 &&
            this.fingerItems.length === 0 &&
            this.floatingItems.length === 0 &&
            this.handsItems.length === 0 &&
            this.heldItems.length === 0 &&
            this.legsItems.length === 0 &&
            this.lightItems.length === 0 &&
            this.neckItems.length === 0 &&
            this.shieldItems.length === 0 &&
            this.torsoItems.length === 0 &&
            this.waistItems.length === 0 &&
            this.wristItems.length === 0 &&
            this.headItems.length === 0 &&
            this.wieldItems.length === 0);
    }

    GetEquipmentItemsFromInventory() {

        let inventory = [];
        Object.keys(this.formGroup.controls).forEach(key => {

            this.charStore.select(x => x.character.mob.inventory).subscribe(x => {
                inventory = x;
            });

            const indexToRemove = inventory.findIndex(i => i === this.formGroup.get(key).value);

            if (indexToRemove > -1) {

                this.charStore.dispatch(new RemoveFromInventory(indexToRemove));
                this.charStore.dispatch(new AddToEquipment(this.formGroup.get(key).value));
            }


        });

    }


}
