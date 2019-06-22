import {
    Validators,
    FormBuilder,
    FormGroup,

} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Exit } from '../../../interfaces/exit.interface';

@Injectable({
    providedIn: 'root'
})

export class RoomExitService {

    constructor(private formBuilder: FormBuilder) { }

    public addExitForm = this.formBuilder.group({
        coordX: ['', Validators.required],
        coordY: ['', Validators.required],
        coordZ: ['', Validators.required],
        open: [false],
        canOpen: [false],
        locked: [false],
        canLock: [false],
        lockId: [''],
        name: [''],
    });

    returnExitObj(): Exit {
        return {
            AreaId: 0,
            Name: this.addExitForm.get('name').value,
            coords: {
                x: this.addExitForm.get('coordX').value,
                y: this.addExitForm.get('coordY').value,
                z: this.addExitForm.get('coordZ').value
            },
        };
    }




}
