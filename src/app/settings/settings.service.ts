import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Settings } from './settings.interface';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private host = environment.hostAPI;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    constructor(private http: HttpClient) { }

    getSettings() {
        return this.http.get<Settings>(`${this.host}config`);
    }

    updateSettings(data: Settings) {
        console.log("settings", JSON.stringify(data))
        return this.http.post(`${this.host}config`, JSON.stringify(data), { headers: this.headers });

    }


}

