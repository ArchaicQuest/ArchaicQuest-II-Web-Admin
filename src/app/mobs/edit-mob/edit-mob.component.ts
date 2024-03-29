import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EquipmentComponent } from '../../characters/equipment/equipment.component';
import { Alignment } from '../../characters/interfaces/alignment.interface';
import { Class } from '../../characters/interfaces/class.interface';
import { Gender } from '../../characters/interfaces/gender.interface';
import { Race } from '../../characters/interfaces/race.interface';
import { Status } from '../../characters/interfaces/status.interface';
import { AddToInventory, ClearInventory, RemoveFromInventory, SaveChar } from '../../characters/state/character.actions';
import { CharacterAppState } from '../../characters/state/character.state';
import { Item } from '../../items/interfaces/item.interface';
import { Option } from '../../shared/interfaces/option.interface';
import { Mob, MobData } from '../interfaces/mob.interface';
import { EditMobService } from './edit-mob.service';
import { getAC } from 'src/app/characters/state/character.selector';
import { CodeModel } from '@ngstack/code-editor';
import { SpellList } from 'src/app/characters/interfaces/characters.interface';


@Component({
    templateUrl: './edit-mob.component.html',
    styleUrls: ['../mob.component.scss']
})
export class EditMobComponent extends OnDestroyMixin implements OnInit, OnDestroy {
    addMobForm: FormGroup;
    races: Race[];
    classes: Class[];
    genders: Gender[];
    alignments: Alignment[];
    statuses: Status[];
    attackTypes: Option[];
    inventoryItems: Item[] = [];
    filteredItems: Observable<Item[]>;
    emotes: string[] = [''];
    spellList: SpellList[] = [];
    currentAlignment: any;
    panelOpenState = false;
    loaded = false;
    theme = 'vs-dark';

    onEnterModel: CodeModel = {
        language: 'lua',
        uri: 'lua.json',
        value: 'xx',
    };
    onLeaveModel: CodeModel = {
        language: 'lua',
        uri: 'lua2.json',
        value: '',
    };

    actModel: CodeModel = {
        language: 'lua',
        uri: 'lua3.json',
        value: '',
    };

    giveModel: CodeModel = {
        language: 'lua',
        uri: 'lua4.json',
        value: '',
    };


    options = {
        contextmenu: true,
        wordWrap: 'wordWrapColumn',
        minimap: {
            enabled: false,
        },
    };
    constructor(
        private mobService: EditMobService,
        private store: Store<CharacterAppState>,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private changeDetector: ChangeDetectorRef
    ) { super(); }
    @ViewChild(EquipmentComponent) equipmentComponent: EquipmentComponent;
    @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;

    onCodeChanged(value) {
        this.addMobForm.get('events').get('enter').setValue(value);
    }

    onLeaveChanged(value) {
        this.addMobForm.get('events').get('leave').setValue(value);
    }
    actChanged(value) {
        this.addMobForm.get('events').get('act').setValue(value);
    }

    giveChanged(value) {
        this.addMobForm.get('events').get('give').setValue(value);
    }

    ngOnInit() {
        this.addMobForm = this.mobService.getAddMobForm();
        this.genders = this.mobService.getGender();

        this.statuses = this.mobService.getStatus();


        this.mobService.getDefaultAttackType().subscribe((data: Option[]) => {
            this.attackTypes = data;
        });

        this.mobService.getRaces().subscribe((data: Race[]) => {
            this.races = data;
        });

        this.mobService.getClasses().subscribe((data: Race[]) => {
            this.classes = data;
        });

        setTimeout(() => {



            this.mobService.loadMob(this.route.snapshot.params['id']).pipe(
                takeUntil(componentDestroyed(this))
            ).subscribe(mob => {

                this.loaded = true;

                console.log('loaded', mob);
                console.log('x', mob.attributes.attribute['Strength']);
                console.log('y', mob.className);

                this.mobService.getAlignment().subscribe((data: Alignment[]) => {
                    this.alignments = data;

                    this.currentAlignment = this.alignments.find(x => x.value === +mob.alignmentScore);
                    this.addMobForm.get('alignment').setValue(this.currentAlignment);
                    this.addMobForm.get('alignment').updateValueAndValidity();
                });


                mob.inventory.forEach(element => {
                    this.store.dispatch(new AddToInventory(element));
                });

                this.addMobForm.get('stats').get('hitPoints').setValue(mob.attributes.attribute['Hitpoints']);
                this.addMobForm.get('stats').get('manaPoints').setValue(mob.attributes.attribute['Mana']);
                this.addMobForm.get('stats').get('movePoints').setValue(mob.attributes.attribute['Moves']);

                this.addMobForm.patchValue({
                    alignment: mob.alignmentScore,
                    armorRating: {
                        armour: mob.armorRating.armour,
                        magic: mob.armorRating.magic
                    },
                    inventory: [...mob.inventory],
                    equipped: mob.equipped, // change store for inv to handle equipped items
                    status: mob.status,
                    attributes: {

                        strength: mob.attributes.attribute['Strength'],
                        dexterity: mob.attributes.attribute['Dexterity'],
                        constitution: mob.attributes.attribute['Constitution'],
                        wisdom: mob.attributes.attribute['Wisdom'],
                        intelligence: mob.attributes.attribute['Intelligence'],
                        charisma: mob.attributes.attribute['Charisma'],
                        hitpoints: mob.attributes.attribute['Hitpoints'],
                        mana: mob.attributes.attribute['Mana'],
                        moves: mob.attributes.attribute['Moves'],
                        damRoll: mob.attributes.attribute['DamageRoll'],
                        hitRoll: mob.attributes.attribute['HitRoll']

                    },
                    class: mob.className,
                    description: mob.description,
                    gender: mob.gender,
                    level: mob.level,
                    stats: mob.status,
                    maxStats: mob.status,
                    money: { gold: mob.money.gold, copper: 0, silver: 0 },
                    longName: mob.longName,
                    name: mob.name,
                    race: mob.race,
                    attackType: mob.defaultAttack,
                    commands: mob.commands,
                    events: mob.events,
                    aggro: mob.aggro,
                    roam: mob.roam,
                    shopkeeper: mob.shopkeeper,
                    trainer: mob.trainer,
                    isMount: mob?.isMount,
                    isHiddenScriptMob: mob?.isHiddenScriptMob,
                    enterEmote: mob.enterEmote,
                    leaveEmote: mob.leaveEmote,

                });

                this.onEnterModel = {
                    language: 'lua',
                    uri: 'lua.json',
                    value: mob.events.enter,
                };

                this.onLeaveModel = {
                    language: 'lua',
                    uri: 'lua2.json',
                    value: mob.events.leave,
                };


                this.actModel = {
                    language: 'lua',
                    uri: 'lua3.json',
                    value: mob.events.act,
                };

                this.giveModel = {
                    language: 'lua',
                    uri: 'lua4.json',
                    value: mob.events.give,
                };
                // this.changeDetector.detectChanges();

                if (mob.emotes.length) {
                    // this is a hack to remove the first object section as
                    // it's added by this.roomServices.addRoomForm;
                    // so what happens is you have a blank object
                    // followed by the other objects with data
                    // so just removed the first instance, quickest solution
                    this.getEmotesControl.removeAt(0);
                    for (let index = 0; index < mob.emotes.length; index++) {
                        if (mob.emotes[index] != null) {
                            this.addEmote(mob.emotes[index]);
                        }

                    }

                }

                if (mob.spellList.length) {
                    // this is a hack to remove the first object section as
                    // it's added by this.roomServices.addRoomForm;
                    // so what happens is you have a blank object
                    // followed by the other objects with data
                    // so just removed the first instance, quickest solution
                    this.getSpellListControl.removeAt(0);


                    for (let index = 0; index < mob.spellList.length; index++) {
                        if (mob.spellList[index] != null) {
                            this.addSpellToList(mob.spellList[index].name, mob.spellList[index].cost);
                        }

                    }

                }

            });



            //  this.addMobForm.updateValueAndValidity();

            // tslint:disable-next-line: forin
            for (const i in this.addMobForm.controls) {
                this.addMobForm.controls[i].markAsTouched();
                this.addMobForm.controls[i].updateValueAndValidity();
            }

            this.addMobForm.get('status').markAsTouched();
            this.addMobForm.get('status').updateValueAndValidity();


        });
    }

    ngOnDestroy(): void {
        this.mobService.clearCache();
        this.getEmotesControl.clear();
        this.store.dispatch(new ClearInventory());
    }

    generateStats() {

        const mobLevel = this.addMobForm.get('level').value || 2;
        const mobCon = this.addMobForm.get('attributes').get('constitution').value || 0;
        const HP = Math.floor((mobLevel * mobCon) / 2);
        const mobDex = this.addMobForm.get('attributes').get('dexterity').value || 0;
        const Move = Math.floor((mobLevel * mobDex) / 2 * 2);
        const mobInt = this.addMobForm.get('attributes').get('intelligence').value || 0;
        const Mana = Math.floor((mobLevel * mobInt) / 2 * 2);
        this.addMobForm.get('stats').get('hitPoints').setValue(HP)
        this.addMobForm.get('stats').get('manaPoints').setValue(Mana)
        this.addMobForm.get('stats').get('movePoints').setValue(Move)

        this.addMobForm.get('attributes').updateValueAndValidity()
        this.addMobForm.get('stats').get('hitPoints').updateValueAndValidity()
        this.addMobForm.get('stats').get('manaPoints').updateValueAndValidity()
        this.addMobForm.get('stats').get('movePoints').updateValueAndValidity()
    }
    getRaceAttributes(raceName: string) {
        return this.races.find((x) => x.name === raceName);
    }

    generateAttributes(raceName: string) {

        const stats = this.getRaceAttributes(raceName) as any;
        this.addMobForm
            .get('attributes')
            .get('strength')
            .setValue(stats.attributes.attribute.Strength);
        this.addMobForm
            .get('attributes')
            .get('dexterity')
            .setValue(stats.attributes.attribute.Dexterity);
        this.addMobForm
            .get('attributes')
            .get('constitution')
            .setValue(stats.attributes.attribute.Constitution);
        this.addMobForm
            .get('attributes')
            .get('wisdom')
            .setValue(stats.attributes.attribute.Wisdom);
        this.addMobForm
            .get('attributes')
            .get('intelligence')
            .setValue(stats.attributes.attribute.Intelligence);
        this.addMobForm
            .get('attributes')
            .get('charisma')
            .setValue(stats.attributes.attribute.Charisma);

        this.generateStats()
    }

    triggerDescriptionResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    selectGender(data: MatSelectChange) {
        console.log('gender', data.value);
    }

    selectRace(data: MatSelectChange) {
        console.log('race', data.value);
        this.generateAttributes(data.value)
    }

    selectClass(data: MatSelectChange) {
        console.log('class', data.value);
    }

    selectAlignment(data: MatSelectChange) {
        console.log('alignment', data.value);
    }
    selectStatus(data: MatSelectChange) {
        console.log('status', data.value);
    }


    get getEmotesControl(): FormArray {
        return this.addMobForm.get('emotes') as FormArray;
    }

    addEmote(data: string) {
        this.getEmotesControl.push(this.mobService.initEmote(data));

        console.log(this.mobService.addMobForm.value);
    }

    removeLink(i: number) {
        this.getEmotesControl.removeAt(i);
    }

    get getSpellListControl(): FormArray {
        return this.addMobForm.get('spellList') as FormArray;
    }

    addSpellToList(name: string = "", cost: number = 0) {
        this.getSpellListControl.push(this.mobService.initSpellList(name, cost));

        console.log(this.mobService.addMobForm.value);
    }


    removeSpellListLink(i: number) {
        this.getSpellListControl.removeAt(i);
    }

    addMob() {
        // todo inventory and EQ

        // this.equipmentComponent.GetEquipmentItemsFromInventory()


        let mob: MobData = {
            mob: {
            alignmentScore: this.addMobForm.get('alignment').value.value,
            armorRating: {
                armour: 0,
                magic: 0
            },
            inventory: [],
            emotes: [],
            equipped: null, // change store for inv to handle equipped items
            status: this.addMobForm.get('status').value,
            attributes: {
                attribute: {
                    strength: this.addMobForm.get('attributes').get('strength').value,
                    dexterity: this.addMobForm.get('attributes').get('dexterity').value,
                    constitution: this.addMobForm.get('attributes').get('constitution').value,
                    wisdom: this.addMobForm.get('attributes').get('wisdom').value,
                    intelligence: this.addMobForm.get('attributes').get('intelligence').value,
                    charisma: this.addMobForm.get('attributes').get('charisma').value,
                    hitpoints: this.addMobForm.get('stats').get('hitPoints').value,
                    mana: this.addMobForm.get('stats').get('manaPoints').value,
                    moves: this.addMobForm.get('stats').get('movePoints').value,
                    hitRoll: this.addMobForm.get('attributes').get('hitRoll').value,
                    DamageRoll: this.addMobForm.get('attributes').get('damRoll').value
                }
            },
            maxAttributes: {
                attribute: {
                    strength: this.addMobForm.get('attributes').get('strength').value,
                    dexterity: this.addMobForm.get('attributes').get('dexterity').value,
                    constitution: this.addMobForm.get('attributes').get('constitution').value,
                    wisdom: this.addMobForm.get('attributes').get('wisdom').value,
                    intelligence: this.addMobForm.get('attributes').get('intelligence').value,
                    charisma: this.addMobForm.get('attributes').get('charisma').value,
                    hitpoints: this.addMobForm.get('stats').get('hitPoints').value,
                    mana: this.addMobForm.get('stats').get('manaPoints').value,
                    moves: this.addMobForm.get('stats').get('movePoints').value,
                    hitRoll: this.addMobForm.get('attributes').get('hitRoll').value,
                    DamageRoll: this.addMobForm.get('attributes').get('damRoll').value
                }
            },
            className: this.addMobForm.get('class').value,
            description: this.addMobForm.get('description').value,
            gender: this.addMobForm.get('gender').value,
            level: this.addMobForm.get('level').value,
            stats: this.addMobForm.get('stats').value,
            maxStats: this.addMobForm.get('stats').value,
            money: { gold: Math.floor(this.addMobForm.get('level').value * 4.2), copper: 0, silver: 0 },
            longName: this.addMobForm.get('longName').value,
            name: this.addMobForm.get('name').value,
            race: this.addMobForm.get('race').value,
            defaultAttack: this.addMobForm.get('attackType').value,
            id: this.route.snapshot.params['id'],
            commands: this.addMobForm.get('commands').value,
            events: {
                enter: this.addMobForm.get('events').get('enter').value,
                leave: this.addMobForm.get('events').get('leave').value,
                act: this.addMobForm.get('events').get('act').value,
                give: this.addMobForm.get('events').get('give').value,
            },
            aggro: this.addMobForm.get('aggro').value,
            roam: this.addMobForm.get('roam').value,
            shopkeeper: this.addMobForm.get('shopkeeper').value,
            trainer: this.addMobForm.get('trainer').value,
            isMount: this.addMobForm.get('isMount').value || false,
            isHiddenScriptMob: this.addMobForm.get('isHiddenScriptMob').value || false,
            enterEmote: this.addMobForm.get('enterEmote').value || "",
            leaveEmote: this.addMobForm.get('leaveEmote').value || "",
            spellList: []
        },
        updateAllInstances: this.addMobForm.get('updateAllInstances').value
        };

        this.store.select(x => x.character.mob.inventory).subscribe(x => {

            console.log('store', x)
            Object.assign(mob.mob, {inventory: x});

            mob.mob.inventory = x;
         
        });

        this.store.select(x => x.character.mob.equipped).subscribe(x => {
            Object.assign(mob.mob, {equipped: x});
        });

        this.store
            .select(getAC)
            .subscribe((ac: any) => {

                if (ac == null) {
                    return;
                }
                Object.assign(mob.mob.armorRating.armour, {armour: ac.armour, magic:  Math.floor(ac.armour / 2)});
         
            });

        this.getEmotesControl.value.forEach((emote: { emote: string }) => {
            mob.mob.emotes.push(emote.emote);

        });


        this.getSpellListControl.value.forEach((spellList: SpellList) => {

            mob.mob.spellList.push(spellList);
        });


    console.log('mob data ', mob)
     this.store.dispatch(new SaveChar(mob));


    }
}
