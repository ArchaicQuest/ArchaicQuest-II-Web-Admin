import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../interfaces/room.interface';
import { tap, catchError } from 'rxjs/operators';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';

@Injectable({
    providedIn: 'root'
})

export class EditRoomService {
    private host = 'http://localhost:57814/api/'; // `${environment.hostAPI}`;
    private saveRoomUrl = `${this.host}room/post`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    getRoom() {
        //  call get endpoint  http://localhost:57814/api/World/Room/19
    }


    saveRoom(data: Room) {
        return this.http.post(this.saveRoomUrl, JSON.stringify(data),
            { headers: this.headers, responseType: 'text' }).pipe(
                tap(x => console.log(x))
            ).subscribe();

    }


}
