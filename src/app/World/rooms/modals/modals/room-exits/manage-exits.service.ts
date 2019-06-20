import {
    Validators,
    FormBuilder,
    FormGroup,

} from '@angular/forms';
import { Injectable } from '@angular/core';

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




}
