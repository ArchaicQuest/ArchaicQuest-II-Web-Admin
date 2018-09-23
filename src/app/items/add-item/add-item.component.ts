import { Component, OnInit, ViewChild, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { takeWhile, take } from 'rxjs/operators';
import { ItemType } from '../interfaces/item-type.interface';
import { ItemAppState } from '../state/add-item.state';
import { GetItemTypes, GetItemSlotTypes, GetArmourTypes, PostItem, PostItemSuccess, GetFlags, GetWeaponTypes, GetDamageTypes, GetAttackTypes } from '../state/add-item.actions';
import { getItemTypes, getItemSlotTypes, getArmourTypes, getFlags, getWeaponTypes, getDamageTypes, getAttackTypes } from '../state/add-item.selector';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Item } from '../interfaces/item.interface';

@Component({
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnDestroy, OnInit {
    componentActive = true;
    addItemForm: FormGroup;
    itemTypes: ItemType[];
    itemSlotTypes: ItemType[];
    armourTypes: ItemType[];
    weaponTypes: ItemType[];
    attackTypes: ItemType[];
    damageTypes: ItemType[];
    flags: ItemType[];
    showWeaponSection = false;
    showArmourSection = false;


    constructor(private formBuilder: FormBuilder, private ngZone: NgZone, private store: Store<ItemAppState>) { }
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addItemForm = this.formBuilder.group({
            name: ['', Validators.required],
            knownByName: [''],
            itemType: [''],
            itemSlotType: [''],
            minLevel: [''],
            weaponType: [''],
            attackType: [''],
            damageType: [''],
            minDamage: [''],
            maxDamage: [''],
            armourType: [''],
            acPierce: [''],
            acBash: [''],
            acSlash: [''],
            acMagic: [''],
            hitRoll: [''],
            damRoll: [''],
            saves: [''],
            hpMod: [''],
            manaMod: [''],
            movesMod: [''],
            spellMod: [''],
            flags: new FormGroup({}),
            lookDescription: ['', Validators.required],
            roomDescription: [''],
            examDescription: [''],
            smellDescription: [''],
            touchDescription: [''],
            tasteDescription: ['']
        });




        this.addItemForm.get('itemType').valueChanges.subscribe(value => {
            this.toggleItemSection(value)
        });

        this.store.dispatch(new GetItemTypes());
        this.store.dispatch(new GetItemSlotTypes());
        this.store.dispatch(new GetArmourTypes());
        this.store.dispatch(new GetWeaponTypes());
        this.store.dispatch(new GetAttackTypes());
        this.store.dispatch(new GetDamageTypes());
        this.store.dispatch(new GetFlags());

        this.store.pipe(select(getItemTypes),
            takeWhile(() => this.componentActive))
            .subscribe(
                (itemTypes: any) => {
                    console.log('in component ', itemTypes)
                    this.itemTypes = itemTypes;
                }
            );

        this.store.pipe(select(getItemSlotTypes),
            takeWhile(() => this.componentActive))
            .subscribe(
                (slotTypes: any) => {
                    this.itemSlotTypes = slotTypes;
                }
            );

        this.store.pipe(select(getArmourTypes),
            takeWhile(() => this.componentActive))
            .subscribe(
                (ArmourTypes: ItemType[]) => {
                    this.armourTypes = ArmourTypes;
                }
            );

        this.store.pipe(select(getWeaponTypes),
            takeWhile(() => this.componentActive))
            .subscribe(
                (WeaponTypes: ItemType[]) => {
                    this.weaponTypes = WeaponTypes;
                }
            );

        this.store.pipe(select(getDamageTypes),
            takeWhile(() => this.componentActive))
            .subscribe(
                (damageTypes: ItemType[]) => {
                    this.damageTypes = damageTypes;
                }
            );

        this.store.pipe(select(getAttackTypes),
            takeWhile(() => this.componentActive))
            .subscribe(
                (attackTypes: ItemType[]) => {
                    this.attackTypes = attackTypes;
                }
            );

        this.store.pipe(select(getFlags),
            takeWhile(() => this.componentActive))
            .subscribe(
                (flagArr: ItemType[]) => {


                    this.flags = flagArr;

                    this.flags.forEach(flag => {
                        (this.addItemForm.controls['flags'] as FormGroup).addControl(flag.name, new FormControl());
                    });
                    //  console.log(this.addItemForm)
                }
            );
    }

    get getFlagControl(): FormArray {
        return this.addItemForm.get('flags') as FormArray;
    }

    addFlag() {
        this.getFlagControl.push(this.formBuilder.control(''));
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    toggleItemSection(event: string) {
        const itemType = event;

        console.log(itemType);
        this.showArmourSection = false;
        this.showWeaponSection = false;

        if (itemType === 'Armour') {
            this.showArmourSection = true;
        } else if (itemType === 'Weapon') {
            this.showWeaponSection = true;
        }
    }

    addItem() {
        console.log(this.addItemForm.get('roomDescription').value)
        const item: Item = {
            name: this.addItemForm.get('name').value,
            knownByName: this.addItemForm.get('knownByName').value,
            itemType: this.addItemForm.get('itemType').value,
            slot: this.addItemForm.get('itemSlotType').value,
            description: {
                Room: this.addItemForm.get('roomDescription').value,
                Exam: this.addItemForm.get('examDescription').value,
                Look: this.addItemForm.get('lookDescription').value,
                Smell: this.addItemForm.get('smellDescription').value,
                Taste: this.addItemForm.get('tasteDescription').value,
                Touch: this.addItemForm.get('touchDescription').value,
            },
            armourRating: {
                armour: this.addItemForm.get('acPierce').value,
                magic: this.addItemForm.get('acMagic').value,
            },
            attackType: this.addItemForm.get('attackType').value,
            damage: {
                DiceRoll: this.addItemForm.get('minDamage').value,
                DieSize: this.addItemForm.get('maxDamage').value
            },
            weaponType: this.addItemForm.get('weaponType').value,
            condition: 1,
            containerItems: [],
            damageType: this.addItemForm.get('damageType').value,
            decayTimer: 2,
            forageRank: 0,
            hidden: false,
            infinite: false,
            isHiddenInRoom: false,
            itemFlags: this.addItemForm.get('flags').value,
            keywords: [],
            minLevel: this.addItemForm.get('minLevel').value,
            modifiers: {},
            questItem: false,
            stuck: false,
            uses: 0,
            weight: 5

        };



        this.store.dispatch(new PostItem(item));

    }

}
