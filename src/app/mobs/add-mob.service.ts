import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gender } from '../characters/interfaces/gender.interface';
import { GenderEnum } from '../characters/enums/gender.enum';
import { Race } from '../characters/interfaces/race.interface';
import { RaceEnums } from '../characters/enums/race.enums';

import { ClassEnums } from '../characters/enums/class.enums';
import { Class } from '../characters/interfaces/class.interface';
import { Alignment } from '../characters/interfaces/alignment.interface';
import { AlignmentEnums } from '../characters/enums/alignment.enum';
import { Mob } from './interfaces/mob.interface';
import { Status } from '../characters/interfaces/status.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.staging';

@Injectable({
    providedIn: 'root'
})
/*
  todo
  ----
  money
  inventory / Worn / wielded items
  active affects
  emotes
*/
export class MobService {
    private host = `${environment.hostAPI}`;
    private saveMobUrl = `${this.host}mob/PostMob`;
    private getRacesUrl = `${this.host}/Character/Race`;
    private getClassesUrl = `${this.host}/Character/Class`;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });


    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }


    public addMobForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        gender: ['', Validators.required],
        race: ['', Validators.required],
        class: ['', Validators.required],
        alignment: ['', Validators.required],
        status: [1, Validators.required],
        attackType: ['', Validators.required],
        description: ['', Validators.required],
        greetMessage: [''],
        emotes: this.formBuilder.array([this.initEmote()]),
        level: ['', [Validators.min(1), Validators.max(99)]],
        stats: new FormGroup({
            hitPoints: new FormControl('', [Validators.min(1), Validators.max(99)]),
            manaPoints: new FormControl('', [Validators.min(1), Validators.max(99)]),
            movePoints: new FormControl('', [Validators.min(1), Validators.max(99)])
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
            charisma: new FormControl('', [Validators.min(1), Validators.max(99)])
        })
    });

    saveMob(mob: Mob) {
        console.log('post this ', mob);
        return this.http.post(this.saveMobUrl, JSON.stringify(mob), {
            headers: this.headers,
            responseType: 'text'
        });
    }

    getAddMobForm() {
        return this.addMobForm;
    }

    initEmote() {
        return this.formBuilder.group({
            emote: ''
        });
    }


    getGender(): Gender[] {
        return [
            {
                name: 'None',
                id: GenderEnum.None
            },
            {
                name: 'Male',
                id: GenderEnum.Male
            },
            {
                name: 'Female',
                id: GenderEnum.Female
            }
        ];
    }

    getRaces(): Observable<Race[]> {
        return this.http.get<Array<Race>>(this.getRacesUrl);
    }

    getClasses(): Observable<Class[]> {
        return this.http.get<Array<Class>>(this.getClassesUrl);
    }

    getAlignment(): Alignment[] {
        return [
            {
                name: 'Lawful Good',
                id: AlignmentEnums.LawfulGood
            },
            {
                name: 'Neutral Good',
                id: AlignmentEnums.NeutralGood
            },
            {
                name: 'Chaotic Good',
                id: AlignmentEnums.ChaoticGood
            },
            {
                name: 'Lawful Neutral',
                id: AlignmentEnums.LawfulNeutral
            },
            {
                name: 'Neutral Good',
                id: AlignmentEnums.Neutral
            },
            {
                name: 'Chaotic Neutral',
                id: AlignmentEnums.ChaoticNeutral
            },
            {
                name: 'Lawful Evil',
                id: AlignmentEnums.LawfulEvil
            },
            {
                name: 'Neutral Evil',
                id: AlignmentEnums.NeutralEvil
            },
            {
                name: 'Chaotic Evil',
                id: AlignmentEnums.ChaoticEvil
            }
        ];
    }

    getStatus(): Status[] {
        return [{
            name: 'Sitting',
            id: 1,
        },
        {
            name: 'Standing',
            id: 2,
        },
        {
            name: 'Sleeping',
            id: 3,
        },
        {
            name: 'Fighting',
            id: 4,
        },
        {
            name: 'Resting',
            id: 5,
        },
        {
            name: 'Incapitated',
            id: 6,
        },
        {
            name: 'Dead',
            id: 7,
        },
        {
            name: 'Ghost',
            id: 8,
        },
        {
            name: 'Busy',
            id: 9,
        },
        {
            name: 'Floating',
            id: 10,
        },
        {
            name: 'Mounted',
            id: 11,
        },
        {
            name: 'Stunned',
            id: 12,
        }]
    }

    getDefaultAttackType(): Status[] {
        return [{
            name: 'Punch',
            id: 1,
        },
        {
            name: 'Pound',
            id: 2,
        },
        {
            name: 'Bite',
            id: 3,
        },
        {
            name: 'Charge',
            id: 4,
        },
        {
            name: 'Peck',
            id: 5,
        },
        {
            name: 'Headbutt',
            id: 6,
        }]
    }

    generateRandomStat(): number {
        const min = 12;
        const max = 20;
        return Math.floor(Math.random() * (max - min) + min);
    }
}
