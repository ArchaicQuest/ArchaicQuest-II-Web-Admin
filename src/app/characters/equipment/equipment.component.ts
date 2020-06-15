import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/items/add-item/add-item.service';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Equipment } from '../interfaces/equipment.interface';
import { RemoveEquipment, UpdateEquipment, UpdateEquipped } from '../state/character.actions';
import { getInventory } from '../state/character.selector';
import { CharacterAppState } from '../state/character.state';
import { EqSlot } from './equipment.enum';
import { take } from 'rxjs/operators';
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

        if (equipped == null) {
            return;
        }

        switch (EQSlot) {
            case EqSlot.Arms:
                equipped.arms = item;
                break;
            case EqSlot.Body:
                equipped.body = item;
                break;
            case EqSlot.Face:
                equipped.face = item;
                break;
            case EqSlot.Feet:
                equipped.feet = item;
                break;
            case EqSlot.Finger: //2
                equipped.finger = item;
                break;

            case EqSlot.Floating:
                equipped.floating = item;
                break;
            case EqSlot.Hands:
                equipped.hands = item;
                break;
            case EqSlot.Held:
                equipped.held = item;
                break;
            case EqSlot.Head:
                equipped.head = item;
                break;
            case EqSlot.Light:
                equipped.light = item;
                break;
            case EqSlot.Legs:
                equipped.legs = item;
                break;
            case EqSlot.Neck:
                equipped.neck = item;
                break;
            case EqSlot.Shield:
                equipped.shield = item;
                break;
            case EqSlot.Torso:
                equipped.torso = item;
                break;
            case EqSlot.Waist:
                equipped.waist = item;
                break;
            case EqSlot.Wrist: //2
                equipped.wrist = item;
                break;
            case EqSlot.Wielded:
                equipped.wield = item;
                break;
            case EqSlot.Sheathed:
                equipped.sheathed = item;
                break;
            default:
                equipped.held = item;
                break;
        }

        return equipped;
    }

    static returnEQ(EQSlot: EqSlot, equipped: Equipment): Item {
        switch (EQSlot) {
            case EqSlot.Arms:
                return equipped.arms;
            case EqSlot.Body:
                return equipped.body;
            case EqSlot.Face:
                return equipped.face;
            case EqSlot.Feet:
                return equipped.feet;
            case EqSlot.Finger: //2
                return equipped.finger;

            case EqSlot.Floating:
                return equipped.floating;
            case EqSlot.Hands:
                return equipped.hands;
            case EqSlot.Held:
                return equipped.held;
            case EqSlot.Head:
                return equipped.head;
            case EqSlot.Light:
                return equipped.light;
            case EqSlot.Legs:
                return equipped.legs;
            case EqSlot.Neck:
                return equipped.neck;
            case EqSlot.Shield:
                return equipped.shield;
            case EqSlot.Torso:
                return equipped.torso;
            case EqSlot.Waist:
                return equipped.waist;
            case EqSlot.Wrist: //2
                return equipped.wrist;
            case EqSlot.Wielded:
                return equipped.wield;
            case EqSlot.Sheathed:
                return equipped.sheathed;
            default:
                return equipped.held;
        }
    }

    get eqslot() { return EqSlot; }
    ngOnInit() {


        this.charStore.select(x => x.character.mob.inventory).subscribe(x => {
            this.mapEquipmentDropDowns(x);
        });

        this.charStore
            .select(getInventory)
            .subscribe((inventory: Item[]) => {
                console.log(inventory);
                console.log("change")
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


        Object.keys(this.formGroup.controls).forEach(key => {
            this.formGroup.get(key).setValue('');
        });

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
                    if (item.equipped) {
                        this.updateWornEQ(item, 'armsEq');
                    }
                    break;
                case EqSlot.Body:
                    this.bodyItems = this.bodyItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'bodyEq');
                    }
                    break;
                case EqSlot.Face:
                    this.faceItems = this.faceItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'faceEq');
                    }
                    break;
                case EqSlot.Feet:
                    this.feetItems = this.feetItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'feetEq');
                    }
                    break;
                case EqSlot.Finger:
                    this.fingerItems = this.fingerItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'fingerEq');
                    }
                    break;
                case EqSlot.Floating:
                    this.floatingItems = this.floatingItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'floatingEq');
                    }
                    break;
                case EqSlot.Hands:
                    this.handsItems = this.handsItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'handsEq');
                    }
                    break;
                case EqSlot.Held:
                    this.heldItems = this.headItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'heldEq');
                    }
                    break;
                case EqSlot.Head:
                    this.headItems = this.headItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'headEq');
                    }
                    break;
                case EqSlot.Light:
                    this.lightItems = this.lightItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'lightEq');
                    }
                    break;
                case EqSlot.Legs:
                    this.legsItems = this.legsItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'legsEq');
                    }
                    break;
                case EqSlot.Neck:
                    this.neckItems = this.neckItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'neckEq');
                    }
                    break;
                case EqSlot.Shield:
                    this.shieldItems = this.shieldItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'shieldEq');
                    }
                    break;
                case EqSlot.Torso:
                    this.torsoItems = this.torsoItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'torsoEq');
                    }
                    break;
                case EqSlot.Waist:
                    this.waistItems = this.waistItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'waistEq');
                    }
                    break;
                case EqSlot.Wrist:
                    this.wristItems = this.wristItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'wristEq');
                    }
                    break;
                case EqSlot.Wielded:
                    this.wieldItems = this.wieldItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'wieldEq');
                    }
                    break;
                case EqSlot.Sheathed:
                    this.wieldItems = this.wieldItems.concat(this.updateEQArray(item));
                    if (item.equipped) {
                        this.updateWornEQ(item, 'sheathedEq');
                    }
                    break;

                default:
                    console.log(`item slot ${item.slot} is not found`);
            }
        });

    }

    private updateWornEQ(item: Item, formField: string) {
        this.charStore.dispatch(new UpdateEquipped({
            slot: item.slot,
            item: item
        }));
        this.formGroup.get(formField).setValue(item);
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

        if (selection.value === '' || selection.value == null) {
            this.charStore.dispatch(new RemoveEquipment({
                slot: slot,
                item: selection.value
            }));

            return;
        }


        this.charStore.dispatch(new UpdateEquipment({
            slot: slot,
            item: selection.value
        }));
    }

    sheathChange(selection) {
        const uuid = selection.value ? selection.value.uuid : '';
        //   this.resetEQDupe('wieldEq', uuid);
        this.onEQChange(selection, EqSlot.Sheathed);
    }

    wieldChange(selection) {
        const uuid = selection.value ? selection.value.uuid : '';
        this.resetEQDupe('sheathedEq', uuid);
        this.onEQChange(selection, EqSlot.Wielded);
    }

    feetChange(selection) {
        const uuid = selection.value ? selection.value.uuid : '';
        this.resetEQDupe('feetEq', uuid);
        this.onEQChange(selection, EqSlot.Feet);
    }

    heldChange(selection) {

        this.onEQChange(selection, EqSlot.Held);
    }

    headChange(selection) {
        const uuid = selection.value ? selection.value.uuid : '';
        this.resetEQDupe('heldEq', uuid);
        this.onEQChange(selection, EqSlot.Head);
    }

    fingerChange(selection) {
        const uuid = selection.value ? selection.value.uuid : '';

        this.resetEQDupe('finger2Eq', uuid);

        this.onEQChange(selection, EqSlot.Finger);
    }

    // finger2Change(selection) {
    //     this.resetEQDupe('finger2Eq', selection.value.uuid);

    //     this.onEQChange(selection, EqSlot.Finger2);
    // }

    neckChange(selection) {
        const uuid = selection.value ? selection.value.uuid : '';
        this.resetEQDupe('neck2Eq', uuid);

        this.onEQChange(selection, EqSlot.Neck);
    }

    neck2Change(selection) {
        const uuid = selection.value ? selection.value.uuid : '';
        this.resetEQDupe('neckEq', uuid);

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

    // GetEquipmentItemsFromInventory() {

    //     let inventory = [];
    //     Object.keys(this.formGroup.controls).forEach(key => {

    //         this.charStore.select(x => x.character.mob.inventory).subscribe(x => {
    //             inventory = x;
    //         });

    //         const indexToRemove = inventory.findIndex(i => i === this.formGroup.get(key).value);

    //         if (indexToRemove > -1) {

    //             this.charStore.dispatch(new RemoveFromInventory(indexToRemove));
    //             this.charStore.dispatch(new AddToEquipment(this.formGroup.get(key).value));
    //         }


    //     });

    // }



}
