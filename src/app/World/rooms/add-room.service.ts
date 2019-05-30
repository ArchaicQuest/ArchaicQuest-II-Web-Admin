import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class RoomService {
    private host = `${environment.hostAPI}`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    public addRoomForm = this.formBuilder.group({
        id: [''],
        title: ['', Validators.required],
        description: ['', Validators.required],
        roomObjects: this.formBuilder.array([this.initRoomObject()]),
        updateMessage: [''],
        instantRepop: [false],
        mobs: [],
        items: [],
        CoordX: ['', Validators.required],
        CoordY: ['', Validators.required],
        CoordZ: ['', Validators.required],
        Exits: new FormGroup({}),



    });

    // return this.formBuilder.group({
    //     emote: ''
    // });

    initRoomObject() {
        return this.formBuilder.group({
            title: new FormControl(''),
            description: new FormControl(''),
            examine: new FormControl(''),
            touch: new FormControl(''),
            smell: new FormControl(''),
            taste: new FormControl(''),
        });


    }

    // saveMob(mob: Mob) {
    //     console.log('post this ', mob);
    //     return this.http.post(this.saveMobUrl, JSON.stringify(mob), {
    //         headers: this.headers,
    //         responseType: 'text'
    //     });
    // }


}
