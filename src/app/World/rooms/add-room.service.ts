import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl
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
        name: ['', Validators.required],

    });

    // saveMob(mob: Mob) {
    //     console.log('post this ', mob);
    //     return this.http.post(this.saveMobUrl, JSON.stringify(mob), {
    //         headers: this.headers,
    //         responseType: 'text'
    //     });
    // }


}
