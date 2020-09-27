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
        areaId: ['', Validators.required],
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
            areaId: this.addExitForm.get('areaId').value,
            roomId: -1,
            name: this.addExitForm.get('name').value,
            coords: {
                x: this.addExitForm.get('coordX').value,
                y: this.addExitForm.get('coordY').value,
                z: this.addExitForm.get('coordZ').value
            },
            door: this.addExitForm.get('door').value,
            closed: this.addExitForm.get('closed').value,
            hidden: this.addExitForm.get('hidden').value,
            noPass: this.addExitForm.get('noPass').value,
            noScan: this.addExitForm.get('noScan').value,
            keyword: this.addExitForm.get('keyword').value,
            locked: this.addExitForm.get('locked').value,
            lockId: this.addExitForm.get('lockId').value,
            pickProof: this.addExitForm.get('pickProof').value,
        };
    }

    setExitCoord(exitDirection: string, currentCoord: Coords) {
        const newCoord = { ...currentCoord };
        switch (exitDirection) {
            case 'North':
                newCoord.y++;
                break;
            case 'North East':
                newCoord.y++;
                newCoord.x++;
                break;
            case 'East':
                newCoord.x++;
                break;
            case 'South East':
                newCoord.y--;
                newCoord.x++;
                break;
            case 'South':
                newCoord.y--;
                break;
            case 'South West':
                newCoord.y--;
                newCoord.x--;
                break;
            case 'West':
                newCoord.x--;
                break;
            case 'North West':
                newCoord.y++;
                newCoord.x--;
                break;
            case 'Up':
                newCoord.z++;
                break;
            case 'Down':
                newCoord.z--;
                break;

        }

        return newCoord;
    }




}
