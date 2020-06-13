import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mob } from '../interfaces/mob.interface';

@Injectable({
    providedIn: 'root'
})
export class ViewMobService {
    private host = environment.hostAPI;
    private getUrl = `${this.host}Mob/Get`;

    constructor(private http: HttpClient) { }

    getMobs(): Observable<Mob[]> {
        return this.http.get<Mob[]>(this.getUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.host}mob/delete/${id}`);
    }

}
