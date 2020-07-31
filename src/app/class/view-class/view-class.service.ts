import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../interfaces/skill.interface';


@Injectable({
    providedIn: 'root'
})
export class ViewClassService {
    private host = environment.hostAPI;
    private getUrl = `${this.host}Character/Class`;

    constructor(private http: HttpClient) { }

    getClasses(): Observable<any[]> {
        return this.http.get<any[]>(this.getUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.host}skill/delete/${id}`);
    }

}
