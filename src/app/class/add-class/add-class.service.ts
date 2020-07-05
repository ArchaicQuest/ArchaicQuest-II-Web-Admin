import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { StatusEnum } from '../interfaces/status.enum';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private host = environment.hostAPI;
    private postClasslUrl = `${this.host}class/post`;
    private getSkillUrl = `${this.host}skill/Get`;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }



    public postSkill(item: Skill) {
        return this.http.post(this.postClasslUrl, JSON.stringify(item), { headers: this.headers, responseType: 'text' });
    }



    getSkillsSpells(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.getSkillUrl);
    }


}
