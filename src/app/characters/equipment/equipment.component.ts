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
import { v4 } from 'uuid';
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
        this.charStore.dispatch(new GetInventory());

        this.charStore
            .select(getInventory)
            .subscribe((inventory: Item[]) => {
                console.log(inventory);
                this.mapEquipmentDropDowns(inventory);
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

        console.log(v4());
        const x = item;
        x.uuid = v4();
        const eqItems = [];
        eqItems.push(x);
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

    sheathChange(selection) {

        if (this.formGroup.get('wieldEq').value === selection.value) {
            if (this.formGroup.get('wieldEq').value.uuid !== selection.value.uuid) {
                return;
            }
            this.formGroup.get('wieldEq').reset();
        }
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }


}
