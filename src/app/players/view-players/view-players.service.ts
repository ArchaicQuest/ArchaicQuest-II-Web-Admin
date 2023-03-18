import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, Player } from '../../mobs/interfaces/mob.interface';

@Injectable({
    providedIn: 'root'
})
export class ViewPlayerService {
    private host = environment.hostAPI;
    private getUrl = `${this.host}character/Player`;
    private editPlayer = `${this.host}character/update`;
    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) { }

    getPlayers(id: string): Observable<Player[]> {
        return this.http.get<Player[]>(this.getUrl + '/' + id);
    }
    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.host}character/accounts`);
    }

    getPlayer(id: string) {
        return this.http.get<Player>(`${this.host}character/viewPlayer/${id}`);
    }

    savePlayerEdit(playerData: string) {
        return this.http.post<Player>(this.editPlayer, playerData, {headers: this.headers})
    }

}
