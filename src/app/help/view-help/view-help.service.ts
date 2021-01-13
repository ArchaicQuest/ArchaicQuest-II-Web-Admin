import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Help } from '../interfaces/help.interface';

@Injectable({
    providedIn: 'root'
})
export class ViewHelpService {
    private host = environment.hostAPI;
    private getItemsUrl = `${this.host}Item/Get`;

    constructor(private http: HttpClient) { }

    getItemTypes(): Observable<Help[]> {
        return this.http.get<Help[]>(this.getItemsUrl);
    }

    deleteItem(id: number): Observable<any> {
        return this.http.delete<any>(`${this.host}item/delete/${id}`);
    }


}
