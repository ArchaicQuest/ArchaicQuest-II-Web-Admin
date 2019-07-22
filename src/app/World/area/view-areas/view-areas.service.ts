import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../interface/area.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ViewAreasService {
    private host = environment.hostAPI;
    private getAreasUrl = `${this.host}World/Area`;

    constructor(private http: HttpClient) { }

    getItemTypes(): Observable<Area[]> {
        return this.http.get<Area[]>(this.getAreasUrl);
    }

}
