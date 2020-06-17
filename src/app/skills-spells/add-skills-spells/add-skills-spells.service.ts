import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private host = environment.hostAPI;
    private armourTypeUrl = `${this.host}item/ReturnArmourTypes`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    // getItemTypes(): Observable<ItemType[]> {
    //     return this.http.get<ItemType[]>(this.itemTypeUrl);
    // }


}
