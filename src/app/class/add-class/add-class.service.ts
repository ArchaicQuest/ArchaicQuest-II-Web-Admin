import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { StatusEnum } from '../interfaces/status.enum';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { Observable } from 'rxjs';
import { Class } from 'src/app/characters/interfaces/class.interface';
import { EffectLocation } from '../interfaces/effect.interface';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private host = environment.hostAPI;
    private classlUrl = `${this.host}Character/class`;
    private getSkillUrl = `${this.host}skill/Get`;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }



    public postClass(item: Class) {
        return this.http.post(this.classlUrl, JSON.stringify(item), { headers: this.headers, responseType: 'text' });
    }


    public getClass(id: number) {
        return this.http.get(`${this.classlUrl}/${id}`);
    }

    public getSkillsSpells(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.getSkillUrl);
    }

    public getEffectValue(formArray: FormArray, effect: EffectLocation): number {

        let effectValue = 0;
        formArray.controls.find((control) => {
            if (control.get('attribute').value === effect) {
                effectValue = (control.get('value').value as number);
            }
        });

        return effectValue;
    }


}
