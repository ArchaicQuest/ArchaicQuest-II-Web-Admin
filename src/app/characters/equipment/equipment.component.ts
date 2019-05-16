import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/items/add-item/add-item.service';
import { FormBuilder } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import { getInventory } from '../state/character.selector';
import { CharacterAppState } from '../state/character.state';
import { GetInventory, AddToEquipment, RemoveFromInventory, RemoveFromEquipment, AddToInventory, IncreaseArmour, UpdateEquipment, RemoveEquipment } from '../state/character.actions';
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

    static mapItemToEQSlot(EQSlot: EqSlot, item: Item, equipped: Equipment): Equipment {
        switch (EQSlot) {
            case EqSlot.Arms:
                equipped.armsEq = item;
                break;
            case EqSlot.Body:
                equipped.bodyEq = item;
                break;
            case EqSlot.Face:
                equipped.faceEq = item;
                break;
            case EqSlot.Feet:
                equipped.feetEq = item;
                break;
            case EqSlot.Finger: //2
                equipped.fingerEq = item;
                break;
            case EqSlot.Floating:
                equipped.floatingEq = item;
                break;
            case EqSlot.Hands:
                equipped.handsEq = item;
                break;
            case EqSlot.Held:
                equipped.heldEq = item;
                break;
            case EqSlot.Head:
                equipped.headEq = item;
                break;
            case EqSlot.Light:
                equipped.lightEq = item;
                break;
            case EqSlot.Legs:
                equipped.legsEq = item;
                break;
            case EqSlot.Neck:
                equipped.neckEq = item;
                break;
            case EqSlot.Shield:
                equipped.shieldEq = item;
                break;
            case EqSlot.Torso:
                equipped.torsoEq = item;
                break;
            case EqSlot.Waist:
                equipped.waistEq = item;
                break;
            case EqSlot.Wrist: //2
                equipped.wristEq = item;
                break;
            case EqSlot.Wielded:
                equipped.wieldEq = item;
                break;
            default:
                equipped.heldEq = item;
                break;
        }

        return equipped;
    }

    static returnEQ(EQSlot: EqSlot, equipped: Equipment): Item {
        switch (EQSlot) {
            case EqSlot.Arms:
                return equipped.armsEq;
            case EqSlot.Body:
                return equipped.bodyEq;
            case EqSlot.Face:
                return equipped.faceEq;
            case EqSlot.Feet:
                return equipped.feetEq;
            case EqSlot.Finger: //2
                return equipped.fingerEq;
            case EqSlot.Floating:
                return equipped.floatingEq;
            case EqSlot.Hands:
                return equipped.handsEq;
            case EqSlot.Held:
                return equipped.heldEq;
            case EqSlot.Head:
                return equipped.headEq;
            case EqSlot.Light:
                return equipped.lightEq;
            case EqSlot.Legs:
                return equipped.legsEq;
            case EqSlot.Neck:
                return equipped.neckEq;
            case EqSlot.Shield:
                return equipped.shieldEq;
            case EqSlot.Torso:
                return equipped.torsoEq;
            case EqSlot.Waist:
                return equipped.waistEq;
            case EqSlot.Wrist: //2
                return equipped.wristEq;
            case EqSlot.Wielded:
                return equipped.wieldEq;
            default:
                return equipped.heldEq;
        }
    }

    get eqslot() { return EqSlot; }
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
            this.charStore.dispatch(new RemoveEquipment({
                slot: (this.formGroup.get(itemSlot).value as Item).slot,
                item: null
            }));
            this.formGroup.get(itemSlot).reset();

        }
    }

    onEQChange(selection, slot): void {
        debugger;
        if (selection.value === '' || selection.value == null) {
            this.charStore.dispatch(new RemoveEquipment({
                slot: slot,
                item: selection.value
            }));

            return;
        }


        this.charStore.dispatch(new UpdateEquipment({
            slot: (selection.value as Item).slot,
            item: selection.value
        }));
    }

    sheathChange(selection) {
        this.resetEQDupe('wieldEq', selection.value.uuid);
        this.onEQChange(selection, EqSlot.Wielded);
    }

    wieldChange(selection) {
        this.resetEQDupe('sheathedEq', selection.value.uuid);
        this.onEQChange(selection, EqSlot.Wielded);
    }

    heldChange(selection) {

        this.onEQChange(selection, EqSlot.Held);
    }

    headChange(selection) {
        this.resetEQDupe('heldEq', selection.value.uuid);
        this.onEQChange(selection, EqSlot.Head);
    }

    fingerChange(selection) {
        this.resetEQDupe('finger2Eq', selection.value.uuid);

        this.onEQChange(selection, EqSlot.Finger);
    }

    finger2Change(selection) {
        this.resetEQDupe('fingerEq', selection.value.uuid);

        this.onEQChange(selection, EqSlot.Finger);
    }

    neckChange(selection) {
        this.resetEQDupe('neck2Eq', selection.value.uuid);

        this.onEQChange(selection, EqSlot.Neck);
    }

    neck2Change(selection) {
        this.resetEQDupe('neckEq', selection.value.uuid);

        this.onEQChange(selection, EqSlot.Neck);
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
