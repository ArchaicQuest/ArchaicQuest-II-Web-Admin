import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { getAC } from 'src/app/characters/state/character.selector';
import { CodeModel } from '@ngstack/code-editor';
import { SpellList } from 'src/app/characters/interfaces/characters.interface';
import { ViewPlayerService } from '../view-players/view-players.service';
import { ViewMobService } from 'src/app/mobs/view-mobs/view-mobs.service';
import { EditMobService } from '../../mobs/edit-mob/edit-mob.service';


@Component({
    templateUrl: './edit-player.component.html',
    styleUrls: ['../../mobs/mob.component.scss']
})
export class EditPlayerComponent extends OnDestroyMixin implements OnInit, OnDestroy {
    playerForm: FormGroup;
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
    commandLog = [];
    constructor(
        private playerService: ViewPlayerService,
        private mobService: EditMobService,
        private store: Store<CharacterAppState>,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private formBuilder: FormBuilder
    ) { super(); }
    @ViewChild(EquipmentComponent) equipmentComponent: EquipmentComponent;
    @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;

    logModel: CodeModel = {
        language: 'json',
        uri: 'lua.json',
        value: 'xx',
    };
    ngOnInit() {

        this.playerForm = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            longName: ['', Validators.required],
            gender: ['', Validators.required],
            race: ['', Validators.required],
            class: ['', Validators.required],
            alignment: ['', Validators.required],
            status: [1, Validators.required],
            description: ['', Validators.required],
            level: ['', [Validators.min(1), Validators.max(99)]],
            stats: new FormGroup({
                hitPoints: new FormControl('', [Validators.min(1), Validators.max(9999)]),
                manaPoints: new FormControl('', [Validators.min(1), Validators.max(9999)]),
                movePoints: new FormControl('', [Validators.min(1), Validators.max(9999)])
            }),
            attributes: new FormGroup({
                strength: new FormControl('', [Validators.min(1), Validators.max(99)]),
                dexterity: new FormControl('', [Validators.min(1), Validators.max(99)]),
                constitution: new FormControl('', [
                    Validators.min(1),
                    Validators.max(99)
                ]),
                wisdom: new FormControl('', [Validators.min(1), Validators.max(99)]),
                intelligence: new FormControl('', [
                    Validators.min(1),
                    Validators.max(99)
                ]),
                charisma: new FormControl('', [Validators.min(1), Validators.max(99)]),
                damRoll: new FormControl('', [Validators.min(1), Validators.max(999)]),
                hitRoll: new FormControl('', [Validators.min(1), Validators.max(999)])
            }),

            enterEmote: [''],
            leaveEmote: [''],
            commandLog: ['']

        });


        setTimeout(() => {



            this.playerService.getPlayer(this.route.snapshot.params['id']).pipe(
                takeUntil(componentDestroyed(this))
            ).subscribe(mob => {

                this.loaded = true;

                console.log('loaded', mob);
                console.log('x', mob.attributes.attribute['Strength']);
                console.log('y', mob.className);

                this.mobService.getAlignment().subscribe((data: Alignment[]) => {
                    this.alignments = data;

                    this.currentAlignment = this.alignments.find(x => x.value === +mob.alignmentScore);
                    this.playerForm.get('alignment').setValue(this.currentAlignment);
                    this.playerForm.get('alignment').updateValueAndValidity();
                });


                mob.inventory.forEach(element => {
                    this.store.dispatch(new AddToInventory(element));
                });

                this.playerForm.get('stats').get('hitPoints').setValue(mob.attributes.attribute['Hitpoints']);
                this.playerForm.get('stats').get('manaPoints').setValue(mob.attributes.attribute['Mana']);
                this.playerForm.get('stats').get('movePoints').setValue(mob.attributes.attribute['Moves']);
                console.log(mob.commandLog)

                this.commandLog = mob.commandLog;
                this.playerForm.patchValue({
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
                    longName: mob.longName,
                    name: mob.name,
                    race: mob.race,
                    enterEmote: mob.enterEmote,
                    leaveEmote: mob.leaveEmote,
                    commandLog: mob.commandLog

                });



            });



            //  this.playerForm.updateValueAndValidity();

            // tslint:disable-next-line: forin
            for (const i in this.playerForm.controls) {
                this.playerForm.controls[i].markAsTouched();
                this.playerForm.controls[i].updateValueAndValidity();
            }

            this.playerForm.get('status').markAsTouched();
            this.playerForm.get('status').updateValueAndValidity();


        });
    }

    ngOnDestroy(): void {

        this.store.dispatch(new ClearInventory());
    }

    onCodeChanged(value) {
        this.playerForm.get('commandLog').setValue(value);
    }


    triggerDescriptionResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    addMob() {

    }





}
