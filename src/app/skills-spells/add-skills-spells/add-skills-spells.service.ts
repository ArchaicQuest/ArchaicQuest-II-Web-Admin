import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { StatusEnum } from '../interfaces/status.enum';

@Injectable({
    providedIn: 'root'
})
export class SkillSpellService {
    private host = environment.hostAPI;
    private armourTypeUrl = `${this.host}item/ReturnArmourTypes`;

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

    private isFlagSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }

}
