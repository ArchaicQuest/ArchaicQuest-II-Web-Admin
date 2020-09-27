import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AddMobService } from './add-mob.service';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../characters/interfaces/gender.interface';
import { MatSelectChange } from '@angular/material/select';
import { Race } from '../characters/interfaces/race.interface';
import { Class } from '../characters/interfaces/class.interface';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    take,
    startWith,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    catchError
} from 'rxjs/operators';
import { Alignment } from '../characters/interfaces/alignment.interface';
import { Item } from '../items/interfaces/item.interface';
import { Observable, throwError } from 'rxjs';
import { ItemService } from '../items/add-item/add-item.service';
import { Store } from '@ngrx/store';
import { Mob } from './interfaces/mob.interface';
import { CharacterAppState } from '../characters/state/character.state';
import { SaveChar } from '../characters/state/character.actions';
import { Status } from '../characters/interfaces/status.interface';
import { Option } from '../shared/interfaces/option.interface';
import { EquipmentComponent } from '../characters/equipment/equipment.component';
import { CodeModel } from '@ngstack/code-editor';

@Component({
    templateUrl: './add-mob.component.html',
    styleUrls: ['./mob.component.scss']
})
export class AddMobComponent implements OnInit {
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
    panelOpenState = false;
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

    options = {
        contextmenu: true,
        minimap: {
            enabled: false,
        },
    };
    constructor(
        private mobService: AddMobService,
        private store: Store<CharacterAppState>,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private formBuilder: FormBuilder
    ) { }
    @ViewChild(EquipmentComponent) equipmentComponent: EquipmentComponent;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    onCodeChanged(value) {
        console.log('CODE', value);
        this.addMobForm.get('events').get('enter').setValue(value);
    }

    onLeaveChanged(value) {
        console.log('CODE', value);
        this.addMobForm.get('events').get('enter').setValue(value);
    }


    ngOnInit() {
        this.addMobForm = this.mobService.getAddMobForm();
        this.genders = this.mobService.getGender();

        this.statuses = this.mobService.getStatus();

        this.mobService.getAlignment().subscribe((data: Alignment[]) => {
            this.alignments = data;
        });

        this.mobService.getDefaultAttackType().subscribe((data: Option[]) => {
            this.attackTypes = data;
        });

        this.mobService.getRaces().subscribe((data: Race[]) => {
            this.races = data;
        });

        this.mobService.getClasses().subscribe((data: Race[]) => {
            this.classes = data;
        });
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
    generateStats() {
        this.addMobForm
            .get('attributes')
            .get('strength')
            .setValue(this.mobService.generateRandomStat());
        this.addMobForm
            .get('attributes')
            .get('dexterity')
            .setValue(this.mobService.generateRandomStat());
        this.addMobForm
            .get('attributes')
            .get('constitution')
            .setValue(this.mobService.generateRandomStat());
        this.addMobForm
            .get('attributes')
            .get('wisdom')
            .setValue(this.mobService.generateRandomStat());
        this.addMobForm
            .get('attributes')
            .get('intelligence')
            .setValue(this.mobService.generateRandomStat());
        this.addMobForm
            .get('attributes')
            .get('charisma')
            .setValue(this.mobService.generateRandomStat());
    }

    get getEmotesControl(): FormArray {
        return this.addMobForm.get('emotes') as FormArray;
    }

    addEmote() {
        this.getEmotesControl.push(this.mobService.initEmote());

        console.log(this.mobService.addMobForm.value);
    }

    removeLink(i: number) {
        this.getEmotesControl.removeAt(i);
    }

    addMob() {
        // todo inventory and E

        // this.equipmentComponent.GetEquipmentItemsFromInventory()

        const mob: Mob = {
            alignmentScore: this.addMobForm.get('alignment').value,
            armorRating: {
                armour: 0,
                magic: 0
            },
            emotes: [],
            inventory: [],
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
                    hitRoll: 2,
                    DamageRoll: 2,
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
                    hitRoll: 2,
                    DamageRoll: 2,
                }
            },
            className: this.addMobForm.get('class').value,
            description: this.addMobForm.get('description').value,
            gender: this.addMobForm.get('gender').value,
            level: this.addMobForm.get('level').value,
            stats: this.addMobForm.get('stats').value,
            maxStats: this.addMobForm.get('stats').value,
            money: { gold: 0, copper: 0, silver: 0 },
            longName: this.addMobForm.get('longName').value,
            name: this.addMobForm.get('name').value,
            race: this.addMobForm.get('race').value,
            defaultAttack: this.addMobForm.get('attackType').value,
            commands: this.addMobForm.get('commands').value,
            events: {
                enter: this.addMobForm.get('events').get('enter').value,
            }
        };

        this.store.select(x => x.character.mob.inventory).subscribe(x => {
            mob.inventory = x;
        });

        this.store.select(x => x.character.mob.equipped).subscribe(x => {
            mob.equipped = x;
        });
        console.log(mob);
        this.store.dispatch(new SaveChar(mob));
    }
}
