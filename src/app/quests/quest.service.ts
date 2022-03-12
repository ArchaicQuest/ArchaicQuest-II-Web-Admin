import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { IQuest } from './quest.interface';
import { Option } from '../shared/interfaces/option.interface';

@Injectable({
    providedIn: 'root'
})
export class QuestService {

    private host = environment.hostAPI;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(private http: HttpClient) { }

    getQuest() {
        return this.http.get<IQuest[]>(`${this.host}Quest/GetQuests`);
    }

    LoadQuest(id: number) {
        return this.http.get<IQuest>(`${this.host}Quest/?id=${id}`);
    }

    getAreaName() {
        return this.http.get<string[]>(`${this.host}World/Area/List`);
    }


    questTypes(): Option[] {
        return [{
            id: 0,
            name: "Kill"
        },
        {
            id: 1,
            name: "Fetch"
        },
        {
            id: 2,
            name: "Discover"
        },
        {
            id: 3,
            name: "Escort"
        }]
    }

    AddQuest(data: IQuest) {
        console.log("quest", JSON.stringify(data))
        return this.http.post(`${this.host}quest`, JSON.stringify(data), { headers: this.headers });

    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.host}quests/delete/${id}`);
    }

}

