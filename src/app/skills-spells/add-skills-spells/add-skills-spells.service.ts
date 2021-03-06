import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { StatusEnum } from '../interfaces/status.enum';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { Observable } from 'rxjs';
import { SkillType } from '../interfaces/skill-type.interface';

@Injectable({
    providedIn: 'root'
})
export class SkillSpellService {
    private host = environment.hostAPI;
    private postSkillUrl = `${this.host}skill/postSkill`;
    private getSkillUrl = `${this.host}skill/FindSkillById`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }


    hasFlag(flag: number, selectedFlag: StatusEnum): boolean {

        if (flag === StatusEnum.Standing && this.isFlagSet(selectedFlag, StatusEnum.Standing)) {
            return true;
        } else if (flag === StatusEnum.Sitting && this.isFlagSet(selectedFlag, StatusEnum.Sitting)) {
            return true;
        } else if (flag === StatusEnum.Sleeping && this.isFlagSet(selectedFlag, StatusEnum.Sleeping)) {
            return true;
        } else if (flag === StatusEnum.Fighting && this.isFlagSet(selectedFlag, StatusEnum.Fighting)) {
            return true;
        } else if (flag === StatusEnum.Resting && this.isFlagSet(selectedFlag, StatusEnum.Resting)) {
            return true;
        } else if (flag === StatusEnum.Incapacitated && this.isFlagSet(selectedFlag, StatusEnum.Incapacitated)) {
            return true;
        } else if (flag === StatusEnum.Dead && this.isFlagSet(selectedFlag, StatusEnum.Dead)) {
            return true;
        } else if (flag === StatusEnum.Ghost && this.isFlagSet(selectedFlag, StatusEnum.Ghost)) {
            return true;
        } else if (flag === StatusEnum.Busy && this.isFlagSet(selectedFlag, StatusEnum.Busy)) {
            return true;
        } else if (flag === StatusEnum.Floating && this.isFlagSet(selectedFlag, StatusEnum.Floating)) {
            return true;
        } else if (flag === StatusEnum.Mounted && this.isFlagSet(selectedFlag, StatusEnum.Mounted)) {
            return true;
        } else if (flag === StatusEnum.Stunned && this.isFlagSet(selectedFlag, StatusEnum.Stunned)) {
            return true;
        }

        return false;
    }

    hasValidTargetFlag(flag: number, selectedFlag: validTargets): boolean {

        if (flag === validTargets.TargetFightSelf && this.isFlagSet(selectedFlag, validTargets.TargetFightSelf)) {
            return true;
        } else if (flag === validTargets.TargetFightVictim && this.isFlagSet(selectedFlag, validTargets.TargetFightVictim)) {
            return true;
        } else if (flag === validTargets.TargetIgnore && this.isFlagSet(selectedFlag, validTargets.TargetIgnore)) {
            return true;
        } else if (flag === validTargets.TargetNotSelf && this.isFlagSet(selectedFlag, validTargets.TargetNotSelf)) {
            return true;
        } else if (flag === validTargets.TargetObjectEquipped && this.isFlagSet(selectedFlag, validTargets.TargetObjectEquipped)) {
            return true;
        } else if (flag === validTargets.TargetObjectInventory && this.isFlagSet(selectedFlag, validTargets.TargetObjectInventory)) {
            return true;
        } else if (flag === validTargets.TargetObjectRoom && this.isFlagSet(selectedFlag, validTargets.TargetObjectRoom)) {
            return true;
        } else if (flag === validTargets.TargetObjectWorld && this.isFlagSet(selectedFlag, validTargets.TargetObjectWorld)) {
            return true;
        } else if (flag === validTargets.TargetPlayerRoom && this.isFlagSet(selectedFlag, validTargets.TargetPlayerRoom)) {
            return true;
        } else if (flag === validTargets.TargetPlayerWorld && this.isFlagSet(selectedFlag, validTargets.TargetPlayerWorld)) {
            return true;
        } else if (flag === validTargets.TargetSelfOnly && this.isFlagSet(selectedFlag, validTargets.TargetSelfOnly)) {
            return true;
        }

        return false;
    }

    hasSkillTypeFlag(flag: number, selectedFlag: SkillType): boolean {

        if (flag === SkillType.Affect && this.isFlagSet(selectedFlag, SkillType.Affect)) {
            return true;
        } else if (flag === SkillType.Travel && this.isFlagSet(selectedFlag, SkillType.Travel)) {
            return true;
        } else if (flag === SkillType.Creation && this.isFlagSet(selectedFlag, SkillType.Creation)) {
            return true;
        } else if (flag === SkillType.Summon && this.isFlagSet(selectedFlag, SkillType.Summon)) {
            return true;
        } else if (flag === SkillType.Passive && this.isFlagSet(selectedFlag, SkillType.Passive)) {
            return true;
        } else if (flag === SkillType.Damage && this.isFlagSet(selectedFlag, SkillType.Damage)) {
            return true;
        } else if (flag === SkillType.AreaEffect && this.isFlagSet(selectedFlag, SkillType.AreaEffect)) {
            return true;
        } else if (flag === SkillType.RemoveEffect && this.isFlagSet(selectedFlag, SkillType.RemoveEffect)) {
            return true;
        } else if (flag === SkillType.AlterObject && this.isFlagSet(selectedFlag, SkillType.AlterObject)) {
            return true;
        } else if (flag === SkillType.GroupSpell && this.isFlagSet(selectedFlag, SkillType.GroupSpell)) {
            return true;
        } else if (flag === SkillType.AnimateDead && this.isFlagSet(selectedFlag, SkillType.AnimateDead)) {
            return true;
        }

        return false;
    }

    private isFlagSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }

    public postSkill(item: Skill) {
        return this.http.post(this.postSkillUrl, JSON.stringify(item), { headers: this.headers, responseType: 'text' });
    }

    public getSkill(id: number): Observable<Skill> {
        return this.http.get<Skill>(this.getSkillUrl + `?id=${id}`);
    }




}
