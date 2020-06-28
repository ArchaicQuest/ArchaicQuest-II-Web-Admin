import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../interfaces/skill.interface';


@Injectable({
    providedIn: 'root'
})
export class ViewSkillSpellService {
    private host = environment.hostAPI;
    private getUrl = `${this.host}skill/Get`;

    constructor(private http: HttpClient) { }

    getSkillsSpells(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.getUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.host}skill/delete/${id}`);
    }

}
