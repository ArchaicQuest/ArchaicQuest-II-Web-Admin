import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { socials } from './socials.interface';

@Injectable({
    providedIn: 'root'
})
export class SocialsService {

    private host = environment.hostAPI;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(private http: HttpClient) { }

    getSocials() {
        return this.http.get<socials>(`${this.host}socials`);
    }

    updateSettings(data: socials) {
        console.log("settings", JSON.stringify(data))
        return this.http.post(`${this.host}socials`, JSON.stringify(data), { headers: this.headers });

    }
    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.host}socials/delete/${id}`);
    }

}

