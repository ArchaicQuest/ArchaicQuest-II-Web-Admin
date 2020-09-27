import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    SimpleChange,
    OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Store } from '@ngrx/store';
import { CharacterAppState } from '../state/character.state';
import { getAC } from '../state/character.selector';
import { ArmourRating } from 'src/app/items/interfaces/armourRating.interface';
import { IncreaseArmour } from '../state/character.actions';

@Component({
    selector: 'app-armour-class',
    templateUrl: './armour-class.component.html'
})
export class ArmourClassComponent implements OnInit, OnChanges {
    Defense = 0;
    magicDefense = 0;

    @Input() equipment: FormGroup;

    constructor(private charStore: Store<CharacterAppState>) { }

    ngOnInit() {
        this.subscribeToEQChanges();

        this.charStore
            .select(getAC)
            .subscribe((ac: any) => {
                console.log('AC', ac);
                if (ac == null) {
                    return;
                }
                this.Defense = ac.armour;

            });



    }


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.setArmourRating(null);
    }

    // save currecnt ac in memory and use to decrease ac?

    subscribeToEQChanges(): void {
        this.equipment.get('lightEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('headEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('neck2Eq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('bodyEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('torsoEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('waistEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('legsEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('armsEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('wristEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('wrist2Eq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('fingerEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('finger2Eq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('heldEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('shieldEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('wieldEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('sheathedEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

        this.equipment.get('floatingEq').valueChanges.subscribe((value: Item) => {
            this.setArmourRating(value);
        });

    }

    private setArmourRating(value: Item): void {

        setTimeout(() => {


            this.Defense = 0;
            this.magicDefense = 0;
            Object.keys(this.equipment.controls).forEach(eqSlot => {

                if (this.equipment.get(eqSlot).value != null && this.equipment.get(eqSlot).value.armourRating != null) {


                    this.Defense += (this.equipment.get(eqSlot).value as Item).armourRating.armour;
                    this.magicDefense += Math.floor((this.equipment.get(eqSlot).value as Item).armourRating.armour / 2);
                }
            });

            this.charStore.dispatch(new IncreaseArmour(this.Defense));

        });
        // if (value != null) {
        //     this.Defense += value.armourRating.armour;
        //     this.magicDefense += value.armourRating.magic;
        // }

    }
}
