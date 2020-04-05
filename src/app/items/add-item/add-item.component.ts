import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import {
    takeWhile,
    take,
    startWith,
    map,
    switchMap,
    debounceTime,
    distinctUntilChanged
} from 'rxjs/operators';
import { ItemType } from '../interfaces/item-type.interface';
import { ItemAppState } from '../state/add-item.state';
import {
    GetItemTypes,
    GetItemSlotTypes,
    GetArmourTypes,
    PostItem,
    PostItemSuccess,
    GetFlags,
    GetWeaponTypes,
    GetDamageTypes,
    GetAttackTypes
} from '../state/add-item.actions';
import {
    getItemTypes,
    getItemSlotTypes,
    getArmourTypes,
    getFlags,
    getWeaponTypes,
    getDamageTypes,
    getAttackTypes
} from '../state/add-item.selector';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Item } from '../interfaces/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from './add-item.service';
import { ActivatedRoute } from '@angular/router';
import { FlagEnum } from '../interfaces/flags.enums';

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
    containerSize: ItemType[];
    containerCanBeOpened = false;
    containerCanBeLocked = false;
    lockStrength: ItemType[];
    pages: number[] = [];
    showWeaponSection = false;
    showArmourSection = false;
    showBookSection = false;
    showContainerSection = false;
    containerItems: Item[] = [];
    options: Item[] = [];
    filteredOptions: Observable<Item[]>;
    findKeyOptions: Observable<Item[]>;
    selectedItem: Item;
    selectedFlag: FlagEnum;
    selectedFlags: FlagEnum[] = [];
    currentItemTypeValue: string;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private store: Store<ItemAppState>,
        private itemService: ItemService,
        private route: ActivatedRoute
    ) { }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {

        this.addItemForm = this.itemService.getAddItemForm();

        this.filteredOptions = this.addItemForm
            .get('selectContainerItem')
            .valueChanges.pipe(
                startWith(''),
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(name => {
                    if (typeof name !== 'string' || name == null) {
                        return;
                    }
                    return this._filter(name);
                })
            );

        this.findKeyOptions = this.addItemForm
            .get('selectContainerKey')
            .valueChanges.pipe(
                startWith(''),
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(name => {
                    if (typeof name !== 'string' || name == null) {
                        return;
                    }
                    return this._filterKeys(name);
                })
            );



        this.addItemForm.get('containerCanOpen').valueChanges.subscribe(value => {
            this.containerCanBeOpened = !this.containerCanBeOpened;
            if (!this.containerCanBeOpened) {
                this.addItemForm.get('containerOpen').setValue(false);
            }
        });

        this.addItemForm.get('containerCanLock').valueChanges.subscribe(value => {
            this.containerCanBeLocked = !this.containerCanBeLocked;
            if (!this.containerCanBeLocked) {
                this.addItemForm.get('containerLocked').setValue(false);
            }
        });

        this.store.dispatch(new GetFlags());



        this.store
            .pipe(
                select(getFlags),
                takeWhile(() => this.componentActive)
            )
            .subscribe((flagArr: ItemType[]) => {
                this.flags = flagArr;

                this.flags.forEach(flag => {
                    (this.addItemForm.controls['flags'] as FormGroup).addControl(
                        flag.name,
                        new FormControl()
                    );
                });
                //  console.log(this.addItemForm)
            });

        this.itemService.getContainerSize().subscribe(containerSizeData => {
            this.containerSize = containerSizeData;
        });

        this.itemService.getLockStrength().subscribe(lockStrengthData => {
            this.lockStrength = lockStrengthData;
        });


        this.itemService.findItemById(this.route.snapshot.params['id']).subscribe(item => {

            if (this.route.snapshot.params['id'] == null) {
                return;
            }

            this.selectedItem = item;



            this.selectedFlag = item.itemFlag;
            let pageLength = 0;
            item.book.pages.forEach(() => {
                pageLength++;

                if (pageLength === item.book.pages.length - 1) {
                    return;
                }

                this.addPage();
            });

            console.log('locked ', item.container.isLocked);
            this.containerItems = this.selectedItem.container.items;

            let keyName = null;
            this.itemService.findKeyById(this.selectedItem.keyId).subscribe(key => {
                this.displayKeys(key);
                keyName = key;
                console.log('key', key);
            });
            this.currentItemTypeValue = item.itemType;
            console.log('item type ', this.currentItemTypeValue);


            this.addItemForm.patchValue({
                id: item.id,
                name: item.name,
                knownByName: item.knownByName,
                itemType: item.itemType,
                itemSlotType: item.slot,
                level: item.level,
                weaponType: item.weaponType,
                attackType: item.attackType,
                damageType: item.damageType,
                minDamage: item.damage ? item.damage.minimum : 0,
                maxDamage: item.damage ? item.damage.maximum : 0,
                armourType: item.armourType,
                acPierce: item.armourRating ? item.armourRating.armour : 0,
                acBash: item.armourRating ? item.armourRating.armour : 0,
                acSlash: item.armourRating ? item.armourRating.armour : 0,
                acMagic: item.armourRating ? item.armourRating.magic : 0,

                pageCount: item.book.pages.length,
                pages: item.book.pages,
                hitRoll: item.modifier.hitRoll,
                damRoll: item.modifier.damRoll,
                saves: item.modifier.saves,
                hpMod: item.modifier.hp,
                manaMod: item.modifier.mana,
                movesMod: item.modifier.moves,
                spellMod: item.modifier.spellDam,
                flags: item.itemFlag ? item.itemFlag : [],
                'lookDescription': item.description.look,
                roomDescription: item.description.room,
                examDescription: item.description.exam,
                smellDescription: item.description.smell,
                touchDescription: item.description.touch,
                tasteDescription: item.description.taste,
                selectContainerItem: item.container ? item.container.items : null,
                containerOpen: item.container ? item.container.isOpen : false,
                containerLocked: item.container ? item.container.isLocked : false,
                containerCanLock: item.container ? item.container.canLock : false,
                containerCanOpen: item.container ? item.container.canOpen : false,
                containerGP: item.container ? item.container.goldPieces : 0,
                lockStrength: item.container ? item.container.lockDifficulty : 0,
                containerSize: item.container ? item.container.size : 0,
                selectContainerKey: item.container ? keyName != null ? keyName.name : '' : ''

            });


            this.addItemForm.markAsDirty();
            this.addItemForm.markAsTouched();
            this.addItemForm.markAsPending();

            this.addItemForm.get('itemType').updateValueAndValidity();
            this.addItemForm.get('itemSlotType').updateValueAndValidity();
            this.addItemForm.get('weaponType').updateValueAndValidity();
            this.addItemForm.get('attackType').updateValueAndValidity();
            this.addItemForm.get('damageType').updateValueAndValidity();


            this.changeDetector.detectChanges();
            this.addItemForm.updateValueAndValidity();

        });

        if (this.selectedItem == null) {
            this.addPage();
        }


        this.addItemForm.get('itemType').valueChanges.subscribe(value => {
            this.toggleItemSection(value);
        });

    }

    private _filter(value: string): Observable<Item[]> {
        return this.itemService.autocompleteItems(value);
    }

    private _filterKeys(value: string): Observable<Item[]> {
        return this.itemService.findKeyItems(value);
    }

    displayFn(item?: Item): string | undefined {
        console.log('f', item);
        return item != null ? item.name : undefined;
    }

    displayKeys(item?: Item): string | undefined {

        console.log('hello', item);
        return item != null ? item.name : undefined;
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.addItemForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log(invalid);
    }
    get getFlagControl(): FormArray {
        return this.addItemForm.get('flags') as FormArray;
    }

    get getPageControl(): FormArray {
        return this.addItemForm.get('pages') as FormArray;
    }


    hasFlag(flag: number): boolean {
        return this.itemService.hasFlag(flag, this.selectedFlag);
    }

    isFlagSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }


    addFlag() {
        this.getFlagControl.push(this.formBuilder.control(''));
    }

    addPage() {
        console.log('page count', this.pages.length);
        this.pages.push(1);
        let i = 0;
        this.pages.forEach(() => {
            (this.addItemForm.controls['pages'] as FormGroup).addControl(
                `page${i}`,
                new FormControl(this.selectedItem != null ? this.selectedItem.book.pages[i] : '')
            );
            i++;
        });
    }

    addItemToContainer() {
        const item = this.addItemForm.get('selectContainerItem').value;
        if (item == null) {
            return;
        }

        this.containerItems = this.containerItems.concat(item);
    }

    removeItemFromContainer(index: number) {
        this.containerItems.splice(index, 1);
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    toggleItemSection(event: any) {
        const itemType = event.id;

        console.log(itemType);

        this.addItemForm.get('armourType').disable();
        this.showArmourSection = false;
        this.addItemForm.get('weaponType').disable();
        this.addItemForm.get('attackType').disable();
        this.addItemForm.get('damageType').disable();
        this.addItemForm.get('minDamage').disable();
        this.addItemForm.get('maxDamage').disable();
        this.showWeaponSection = false;
        this.showBookSection = false;
        this.addItemForm.get('pageCount').disable();
        this.showContainerSection = false;
        this.addItemForm.get('containerSize').disable();

        if (itemType === 0) {
            this.showArmourSection = true;
            this.addItemForm.get('armourType').enable();
        } else if (itemType === 11) {
            this.showWeaponSection = true;

            this.addItemForm.get('weaponType').enable();
            this.addItemForm.get('attackType').enable();
            this.addItemForm.get('damageType').enable();
            this.addItemForm.get('minDamage').enable();
            this.addItemForm.get('maxDamage').enable();
        } else if (itemType === 1) {
            this.showBookSection = true;
            this.addItemForm.get('pageCount').enable();
        } else if (itemType === 2) {
            this.showContainerSection = true;
            this.addItemForm.get('containerSize').enable();
        }

        this.addItemForm.updateValueAndValidity();
        this.changeDetector.detectChanges();

        this.findInvalidControls();
    }

    updateSelectedFlags(flag: number) {

        if (this.selectedFlags.length && this.selectedFlags.includes(flag)) {
            this.selectedFlags = this.selectedFlags.filter(flagToRemove => flagToRemove !== flag);
        } else {
            this.selectedFlags.push(flag);
        }

        console.log(this.selectedFlags);
    }

    calculateAverageDamage(min = 1, max = 1) {
        return this.itemService.averageDamage(min, max);
    }

    calculateSpellProtection(armour: number) {
        const protection = Math.floor(armour / 2) || 0;
        this.addItemForm.get('acMagic').setValue(protection);
        return protection;
    }

    addItem() {
        const pages: string[] = [];
        let flags: any;

        Object.keys(this.addItemForm.get('pages').value).forEach(page => {
            console.log(this.addItemForm.get('pages').value[page]);
            pages.push(this.addItemForm.get('pages').value[page]);
        });

        flags = this.selectedFlags.reduce((a, b) => a + b, 0);

        console.log('FLAGS' + flags);

        console.log(this.addItemForm.get('roomDescription').value);
        const item: Item = {
            id: this.addItemForm.get('id').value || -1,
            name: this.addItemForm.get('name').value,
            knownByName: this.addItemForm.get('knownByName').value || false,
            itemType: this.addItemForm.get('itemType').value.id,
            slot: this.addItemForm.get('itemSlotType').value.id || 0,
            container: {
                associatedKeyId: this.addItemForm.get('selectContainerKey').value.keyId,
                canLock: this.addItemForm.get('containerCanLock').value || false,
                canOpen: this.addItemForm.get('containerCanOpen').value || false,
                lockDifficulty: +this.addItemForm.get('lockStrength').value || 0,
                items: this.containerItems,
                size: +this.addItemForm.get('containerSize').value || 0,
                isLocked: this.addItemForm.get('containerLocked').value || false,
                isOpen: this.addItemForm.get('containerOpen').value || false,
                goldPieces: this.addItemForm.get('containerGP').value || 0,
            },
            book: {
                pageCount: this.addItemForm.get('pageCount').value || 0,
                pages: pages,
                blank: this.addItemForm.get('pages').value.length > 1
            },
            description: {
                room: this.addItemForm.get('roomDescription').value,
                exam: this.addItemForm.get('examDescription').value,
                look: this.addItemForm.get('lookDescription').value,
                smell: this.addItemForm.get('smellDescription').value,
                taste: this.addItemForm.get('tasteDescription').value,
                touch: this.addItemForm.get('touchDescription').value
            },
            armourType: this.addItemForm.get('armourType').value || 0,
            armourRating: {
                armour: this.addItemForm.get('acPierce').value || 1,
                magic: Math.floor(this.addItemForm.get('acPierce').value / 2) || 0
            },
            attackType: this.addItemForm.get('attackType').value || 0,
            damage: {
                maximum: this.addItemForm.get('maxDamage').value || 1,
                minimum: this.addItemForm.get('minDamage').value || 1
            },
            weaponType: this.addItemForm.get('weaponType').value || 0,
            condition: 1,
            containerItems: [],
            damageType: this.addItemForm.get('damageType').value || 0,
            decayTimer: 2,
            forageRank: 0,
            hidden: false,
            infinite: false,
            isHiddenInRoom: false,
            itemFlag: flags,
            keywords: [],
            level: this.addItemForm.get('level').value || 1,
            modifier: {
                damRoll: this.addItemForm.get('damRoll').value || 0,
                hitRoll: this.addItemForm.get('hitRoll').value || 0,
                hp: this.addItemForm.get('hpMod').value || 0,
                mana: this.addItemForm.get('manaMod').value || 0,
                moves: this.addItemForm.get('movesMod').value || 0,
                spellDam: this.addItemForm.get('spellMod').value || 0,
                saves: this.addItemForm.get('saves').value || 0,
            },
            questItem: false,
            stuck: false,
            uses: 0,
            weight: 5,
            equipped: false
        };

        this.store.dispatch(new PostItem(item));
    }
}
