import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import {
    takeWhile,
    take,
    startWith,
    switchMap,
    debounceTime,
    distinctUntilChanged,
    takeUntil,
    filter
} from 'rxjs/operators';
import { ItemType } from '../interfaces/item-type.interface';
import { ItemAppState } from '../state/add-item.state';
import {
    GetItemTypes,
    PostItem,
    GetFlags,
} from '../state/add-item.actions';
import {
    getItemTypes,
    getFlags,
    getItemSlotTypes,
    getArmourTypes
} from '../state/add-item.selector';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Item } from '../interfaces/item.interface';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { FlagEnum } from '../interfaces/flags.enums';
import { ItemService } from '../add-item/add-item.service';
import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';

@Component({
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent extends OnDestroyMixin implements OnDestroy, OnInit, AfterViewInit {
    componentActive = true;
    itemForm: FormGroup;
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
    showKeySection = false;
    containerItems: Item[] = [];
    options: Item[] = [];
    filteredOptions: Observable<Item[]>;
    findKeyOptions: Observable<Item[]>;
    selectedItem: Item;
    selectedFlag: FlagEnum;
    selectedFlags: FlagEnum[] = [];
    currentItemTypeValue: any;
    currentItemSlotValue: any;
    currentArmourTypeValue: any;
    isHiddenInRoom: boolean;
    constructor(
        private changeDetector: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private store: Store<ItemAppState>,
        private itemService: ItemService,
        private route: ActivatedRoute
    ) { super(); }
    @ViewChild('autosize', { static: true })
    autosize: CdkTextareaAutosize;

    ngOnInit() {

        this.itemForm = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            knownByName: [''],
            itemType: ['', Validators.required],
            itemSlotType: ['', Validators.required],
            level: [''],
            weaponType: [''],
            attackType: [''],
            damageType: ['', Validators.required],
            minDamage: ['', [Validators.min(1), Validators.max(50)]],
            maxDamage: ['', [Validators.min(1), Validators.max(100)]],
            armourType: [''],
            acPierce: [''],
            acBash: [''],
            acSlash: [''],
            acMagic: [''],
            hitRoll: [''],
            DamageRoll: [''],
            saves: [''],
            hpMod: [''],
            manaMod: [''],
            movesMod: [''],
            spellMod: [''],
            pageCount: [1],
            pages: new FormGroup({}),
            flags: new FormGroup({}),
            lookDescription: ['', Validators.required],
            roomDescription: [''],
            examDescription: [''],
            smellDescription: [''],
            touchDescription: [''],
            tasteDescription: [''],
            selectContainerItem: [''],
            containerGP: [''],
            containerOpen: [''],
            containerLocked: [''],
            containerCanLock: [''],
            containerCanOpen: [''],
            lockStrength: [''],
            containerSize: [''],
            selectContainerKey: [''],
            isHiddenInRoom: [false],
            isStuckInRoom: [false],
            keyId: [''],
            value: ['']
        });


        this.filteredOptions = this.itemForm
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

        this.findKeyOptions = this.itemForm
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



        this.itemForm.get('containerCanOpen').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(value => {
            this.containerCanBeOpened = !this.containerCanBeOpened;
            if (!this.containerCanBeOpened) {
                this.itemForm.get('containerOpen').setValue(false);
            }
        });

        this.itemForm.get('containerCanLock').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(value => {

            console.log('container', value);
            this.containerCanBeLocked = !this.containerCanBeLocked;
            if (!this.containerCanBeLocked) {
                this.itemForm.get('containerLocked').setValue(false);
            }
        });

        this.store.dispatch(new GetFlags());





        this.itemService.getContainerSize().pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(containerSizeData => {
            this.containerSize = containerSizeData;
        });

        this.itemService.getLockStrength().pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(lockStrengthData => {
            this.lockStrength = lockStrengthData;
        });


        this.itemService.findItemById(this.route.snapshot.params['id']).pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(item => {

            if (this.route.snapshot.params['id'] == null) {
                return;
            }

            this.selectedItem = item;


            console.log('selectedItem', item);

            this.selectedFlag = item.itemFlag;

            this.store
                .pipe(
                    select(getFlags),
                    filter(val => val != null || val.length > 0),
                    takeUntil(componentDestroyed(this))
                )
                .subscribe((flagArr: ItemType[]) => {
                    this.flags = flagArr;

                    this.flags.forEach(flag => {
                        console.log(flag.name, this.hasFlag({ id: flag.id, name: '' }));
                        (this.itemForm.controls['flags'] as FormGroup).addControl(
                            flag.name,
                            new FormControl(false)
                        );
                    });

                    this.flags.forEach(flag => {
                        this.hasFlag({ id: flag.id, name: flag.name });
                    });

                });

            let pageLength = 0;
            item.book.pages.forEach(() => {
                pageLength++;

                if (pageLength === item.book.pages.length - 1) {
                    return;
                }

                this.addPage();
            });


            this.containerItems = this.selectedItem.container.items;

            let keyName = null;
            this.itemService.findKeyById(this.selectedItem.keyId).pipe(
                takeUntil(componentDestroyed(this))
            ).subscribe(key => {
                this.displayKeys(key);
                keyName = key;

            });


            this.store.dispatch(new GetItemTypes());

            this.store
                .pipe(
                    select(getItemTypes),
                    takeUntil(componentDestroyed(this))
                )
                .subscribe((itemTypes: any[]) => {
                    this.itemTypes = itemTypes;

                    this.currentItemTypeValue = this.itemTypes.find(x => x.id === +item.itemType);
                    this.itemForm.get('itemType').setValue(this.currentItemTypeValue);
                    this.itemForm.get('itemType').updateValueAndValidity();
                });



            this.store
                .pipe(
                    select(getItemSlotTypes),
                    takeUntil(componentDestroyed(this))
                )
                .subscribe((itemSlots: any) => {

                    this.currentItemSlotValue = itemSlots.find(x => x.id === +item.slot);

                    this.itemForm.get('itemSlotType').setValue(this.currentItemSlotValue);
                    this.itemForm.get('itemSlotType').updateValueAndValidity();

                });

            this.store
                .pipe(
                    select(getArmourTypes),
                    takeUntil(componentDestroyed(this))
                )
                .subscribe((armourType: any) => {

                    this.currentArmourTypeValue = armourType.find(x => x.id === +item.armourType);
                    this.itemForm.get('armourType').setValue(this.currentArmourTypeValue);
                    this.itemForm.get('armourType').updateValueAndValidity();

                });

            this.itemForm.patchValue({
                id: item.id,
                name: item.name,
                knownByName: item.knownByName,
                // itemType: item.itemType,
                itemSlotType: item.slot,
                level: item.level,
                weaponType: item.weaponType,
                attackType: item.attackType,
                damageType: item.damageType,
                minDamage: item.damage ? item.damage.minimum : 0,
                maxDamage: item.damage ? item.damage.maximum : 0,
                // armourType: item.armourType,
                acPierce: item.armourRating ? item.armourRating.armour : 0,
                acBash: item.armourRating ? item.armourRating.armour : 0,
                acSlash: item.armourRating ? item.armourRating.armour : 0,
                acMagic: item.armourRating ? item.armourRating.magic : 0,

                pageCount: item.book.pages.length,
                pages: item.book.pages,
                hitRoll: item.modifier.hitRoll,
                DamageRoll: item.modifier.DamageRoll,
                saves: item.modifier.saves,
                hpMod: item.modifier.hp,
                manaMod: item.modifier.mana,
                movesMod: item.modifier.moves,
                spellMod: item.modifier.spellDam,
                flags: item.itemFlag ? item.itemFlag : [],
                lookDescription: item.description.look,
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
                selectContainerKey: item.container ? keyName != null ? keyName.name : '' : '',
                isHiddenInRoom: item.isHiddenInRoom,
                isStuckInRoom: item.stuck,
                keyId: item.keyId,
                value: item.value

            });

            setTimeout(() => {
                // this.itemForm.markAsDirty();
                // this.itemForm.markAsTouched();
                // this.itemForm.markAsPending();


                this.itemForm.get('itemType').updateValueAndValidity();
                this.itemForm.get('armourType').updateValueAndValidity();
                this.itemForm.get('itemSlotType').updateValueAndValidity();
                this.itemForm.get('weaponType').updateValueAndValidity();
                this.itemForm.get('attackType').updateValueAndValidity();
                this.itemForm.get('damageType').updateValueAndValidity();




                // tslint:disable-next-line: forin
                for (const i in this.itemForm.controls) {
                    this.itemForm.controls[i].markAsTouched();
                    this.itemForm.controls[i].updateValueAndValidity();


                }

                this.itemForm.updateValueAndValidity();

            });

        });

        if (this.selectedItem == null) {
            this.addPage();
        }


        this.itemForm.get('itemType').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(value => {
            this.toggleItemSection(value);


            setTimeout(() => {
                // this.itemForm.markAsDirty();
                // this.itemForm.markAsTouched();
                // this.itemForm.markAsPending();



                this.itemForm.get('armourType').updateValueAndValidity();
                this.itemForm.get('itemSlotType').updateValueAndValidity();
                this.itemForm.get('weaponType').updateValueAndValidity();
                this.itemForm.get('attackType').updateValueAndValidity();
                this.itemForm.get('damageType').updateValueAndValidity();


                // this.itemForm.updateValueAndValidity();

            });
        });

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.itemForm.get('itemType').updateValueAndValidity();
            this.itemForm.get('armourType').updateValueAndValidity();
            this.itemForm.get('itemSlotType').updateValueAndValidity();
            this.itemForm.get('weaponType').updateValueAndValidity();
            this.itemForm.get('attackType').updateValueAndValidity();
            this.itemForm.get('damageType').updateValueAndValidity();

            this.itemForm.updateValueAndValidity();
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
        const controls = this.itemForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log('invalid:', invalid);
    }
    get getFlagControl(): FormArray {
        return this.itemForm.get('flags') as FormArray;
    }

    get getPageControl(): FormArray {
        return this.itemForm.get('pages') as FormArray;
    }


    hasFlag(flag: { id: number, name: string }): boolean {
        if (flag.name !== '') {
            this.itemForm.get(['flags', flag.name]).setValue(this.itemService.hasFlag(flag.id, this.selectedFlag));
        }
        return this.itemService.hasFlag(flag.id, this.selectedFlag);
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
            (this.itemForm.controls['pages'] as FormGroup).addControl(
                `page${i}`,
                new FormControl(this.selectedItem != null ? this.selectedItem.book.pages[i] : '')
            );
            i++;
        });
    }

    addItemToContainer() {
        const item = this.itemForm.get('selectContainerItem').value;
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
        this.changeDetector.detach();
        this.itemForm = null;
        console.log('??');
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    toggleItemSection(event: any) {

        if (event == null) {
            return;
        }

        const itemType = event.id;

        console.log(itemType);



        this.itemForm.get('armourType').disable();
        this.showArmourSection = false;
        this.itemForm.get('weaponType').disable();
        this.itemForm.get('attackType').disable();
        this.itemForm.get('damageType').disable();
        this.itemForm.get('minDamage').disable();
        this.itemForm.get('maxDamage').disable();
        this.showWeaponSection = false;
        this.showBookSection = false;
        this.itemForm.get('pageCount').disable();
        this.showContainerSection = false;
        this.itemForm.get('containerSize').disable();
        this.showKeySection = false;

        if (itemType === 0) {
            this.showArmourSection = true;
            this.itemForm.get('armourType').enable();
        } else if (itemType === 11) {
            this.showWeaponSection = true;

            this.itemForm.get('weaponType').enable();
            this.itemForm.get('attackType').enable();
            this.itemForm.get('damageType').enable();
            this.itemForm.get('minDamage').enable();
            this.itemForm.get('maxDamage').enable();
        } else if (itemType === 1) {
            this.showBookSection = true;
            this.itemForm.get('pageCount').enable();
        } else if (itemType === 2) {
            this.showContainerSection = true;
            this.itemForm.get('containerSize').enable();
        }
        else if (itemType === 6) {
            this.showKeySection = true;

        }
        setTimeout(() => {
            this.itemForm.updateValueAndValidity();


            this.findInvalidControls();
        });
    }

    updateSelectedFlags(flag: number) {
        if (this.selectedFlags.length && this.selectedFlags.includes(flag)) {
            this.selectedFlags = this.selectedFlags.filter(flagToRemove => flagToRemove !== flag);
        } else {
            this.selectedFlags.push(flag);
        }

        console.log('selected flags', this.selectedFlags);
    }

    calculateAverageDamage(min = 1, max = 1) {
        return this.itemService.averageDamage(min, max);
    }

    calculateSpellProtection(armour: number) {
        const protection = Math.floor(armour / 2) || 0;
        this.itemForm.get('acMagic').setValue(protection);
        return protection;
    }

    addItem() {
        const pages: string[] = [];
        let flags: any;

        Object.keys(this.itemForm.get('pages').value).forEach(page => {
            console.log(this.itemForm.get('pages').value[page]);
            pages.push(this.itemForm.get('pages').value[page]);
        });

        flags = this.selectedFlags.reduce((a, b) => a + b, 0);

        console.log('FLAGS' + flags);

        console.log(this.itemForm.get('roomDescription').value);
        const item: Item = {
            id: this.itemForm.get('id').value || -1,
            name: this.itemForm.get('name').value,
            knownByName: this.itemForm.get('knownByName').value || false,
            itemType: this.itemForm.get('itemType').value.id,
            slot: this.itemForm.get('itemSlotType').value.id || 0,
            container: {
                associatedKeyId: this.itemForm.get('selectContainerKey').value.keyId,
                canLock: this.itemForm.get('containerCanLock').value || false,
                canOpen: this.itemForm.get('containerCanOpen').value || false,
                lockDifficulty: +this.itemForm.get('lockStrength').value || 0,
                items: this.containerItems,
                size: +this.itemForm.get('containerSize').value || 0,
                isLocked: this.itemForm.get('containerLocked').value || false,
                isOpen: this.itemForm.get('containerOpen').value || false,
                goldPieces: this.itemForm.get('containerGP').value || 0,
            },
            book: {
                pageCount: this.itemForm.get('pageCount').value || 0,
                pages: pages,
                blank: this.itemForm.get('pages').value.length > 1
            },
            description: {
                room: this.itemForm.get('roomDescription').value,
                exam: this.itemForm.get('examDescription').value,
                look: this.itemForm.get('lookDescription').value,
                smell: this.itemForm.get('smellDescription').value,
                taste: this.itemForm.get('tasteDescription').value,
                touch: this.itemForm.get('touchDescription').value
            },
            armourType: this.itemForm.get('armourType').value.id || 0,
            armourRating: {
                armour: this.itemForm.get('acPierce').value || 1,
                magic: Math.floor(this.itemForm.get('acPierce').value / 2) || 0
            },
            attackType: this.itemForm.get('attackType').value || 0,
            damage: {
                maximum: this.itemForm.get('maxDamage').value || 1,
                minimum: this.itemForm.get('minDamage').value || 1
            },
            weaponType: this.itemForm.get('weaponType').value || 0,
            condition: 1,
            containerItems: [],
            damageType: this.itemForm.get('damageType').value || 0,
            decayTimer: 2,
            forageRank: 0,
            hidden: false,
            infinite: false,
            isHiddenInRoom: this.itemForm.get('isHiddenInRoom').value || false,
            itemFlag: flags,
            keywords: [],
            level: this.itemForm.get('level').value || 1,
            modifier: {
                DamageRoll: this.itemForm.get('DamageRoll').value || 0,
                hitRoll: this.itemForm.get('hitRoll').value || 0,
                hp: this.itemForm.get('hpMod').value || 0,
                mana: this.itemForm.get('manaMod').value || 0,
                moves: this.itemForm.get('movesMod').value || 0,
                spellDam: this.itemForm.get('spellMod').value || 0,
                saves: this.itemForm.get('saves').value || 0,
            },
            questItem: false,
            stuck: this.itemForm.get('isStuckInRoom').value || false,
            uses: 0,
            weight: 5,
            equipped: false,
            value: this.itemForm.get('value').value || this.itemForm.get('level').value * 100,
        };

        this.store.dispatch(new PostItem(item));
    }
}
