import {
    Validators,
    FormBuilder,
    FormGroup,

} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Exit } from '../../interfaces/exit.interface';
import { Coords } from 'src/app/shared/interfaces/coords.interface';

@Injectable({
    providedIn: 'root'
})

export class RoomExitService {

    constructor(private formBuilder: FormBuilder) { }

    public addExitForm = this.formBuilder.group({
        coordX: ['', Validators.required],
        coordY: ['', Validators.required],
        coordZ: ['', Validators.required],
        door: [false],
        closed: [false],
        locked: [false],
        pickProof: [false],
        noPass: [false],
        noScan: [false],
        hidden: [false],
        lockId: [''],
        keyword: [''],
        name: ['']
    });

    returnExitObj(): Exit {
        return {
            areaId: 0,
            name: this.addExitForm.get('name').value,
            coords: {
                x: this.addExitForm.get('coordX').value,
                y: this.addExitForm.get('coordY').value,
                z: this.addExitForm.get('coordZ').value
            },
        };
    }

    setExitCoord(exitDirection: string, currentCoord: Coords) {
        switch (exitDirection) {
            case 'North':
                currentCoord.y++;
                break;
            case 'North East':
                currentCoord.y++;
                currentCoord.x++;
                break;
            case 'East':
                currentCoord.x++;
                break;
            case 'South East':
                currentCoord.y--;
                currentCoord.x++;
                break;
            case 'South':
                currentCoord.y--;
                break;
            case 'South West':
                currentCoord.y--;
                currentCoord.x--;
                break;
            case 'West':
                currentCoord.x--;
                break;
            case 'North West':
                currentCoord.y++;
                currentCoord.x--;
                break;
            case 'Up':
                currentCoord.z++;
                break;
            case 'Down':
                currentCoord.z--;
                break;

        }

        return currentCoord;
    }




}
