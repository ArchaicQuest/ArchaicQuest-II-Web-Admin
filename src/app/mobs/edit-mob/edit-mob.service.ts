import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gender } from '../../characters/interfaces/gender.interface';
import { GenderEnum } from '../../characters/enums/gender.enum';
import { Race } from '../../characters/interfaces/race.interface';
import { RaceEnums } from '../../characters/enums/race.enums';

import { ClassEnums } from '../../characters/enums/class.enums';
import { Class } from '../../characters/interfaces/class.interface';
import { Alignment } from '../../characters/interfaces/alignment.interface';
import { AlignmentEnums } from '../../characters/enums/alignment.enum';
import { Mob } from '../interfaces/mob.interface';
import { Status } from '../../characters/interfaces/status.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../../shared/interfaces/option.interface';

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
export class EditMobService {
    private host = `${environment.hostAPI}`;
    private saveMobUrl = `${this.host}Character/Mob`;
    private getRacesUrl = `${this.host}Character/Race`;
    private getClassesUrl = `${this.host}Character/Class`;
    private getAttackTypesUrl = `${this.host}Character/AttackType`;
    private getStatusUrl = '/src/app/mobs/data/status.api.json';
    private getAlignmentUrl = `${this.host}Character/Alignment`;
    private getMobUrl = `${this.host}mob/FindMobById`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    public addMobForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        longName: ['', Validators.required],
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
            hitPoints: new FormControl('', [Validators.min(1), Validators.max(9999)]),
            manaPoints: new FormControl('', [Validators.min(1), Validators.max(999)]),
            movePoints: new FormControl('', [Validators.min(1), Validators.max(999)])
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
        }),
        commands: [''],
        events: new FormGroup({
            enter: new FormControl(''),
            leave: new FormControl(''),
            act: new FormControl(''),
            give: new FormControl(''),
        }),
        roam: new FormControl(false)
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

    initEmote(data: string = '') {
        return this.formBuilder.group({
            emote: data
        });
    }


    clearCache() {

        this.addMobForm.reset();

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

    getAlignment(): Observable<Alignment[]> {
        return this.http.get<Array<Alignment>>(this.getAlignmentUrl);
    }

    getStatus(): Option[] {
        return [
            {
                'name': 'Standing',
                'id': 0
            },
            {
                'name': 'Sitting',
                'id': 1
            },
            {
                'name': 'Sleeping',
                'id': 2
            },
            {
                'name': 'Fighting',
                'id': 3
            },
            {
                'name': 'Resting',
                'id': 4
            },
            {
                'name': 'Incapitated',
                'id': 5
            },
            {
                'name': 'Dead',
                'id': 6
            },
            {
                'name': 'Ghost',
                'id': 7
            },
            {
                'name': 'Busy',
                'id': 8
            },
            {
                'name': 'Floating',
                'id': 9
            },
            {
                'name': 'Mounted',
                'id': 10
            },
            {
                'name': 'Stunned',
                'id': 11
            }
        ];
    }

    getDefaultAttackType(): Observable<Option[]> {
        return this.http.get<Array<Option>>(this.getAttackTypesUrl);
    }

    generateRandomStat(): number {
        const min = 12;
        const max = 20;
        return Math.floor(Math.random() * (max - min) + min);
    }

    loadMob(id: string) {
        return this.http.get<Mob>(this.getMobUrl + `?id=${id}`);
    }
}
