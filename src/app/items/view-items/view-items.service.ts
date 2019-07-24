import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemType } from '../interfaces/item-type.interface';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ViewItemsService {
    private host = environment.hostAPI;
    private getItemsUrl = `${this.host}Item/Get`;

    constructor(private http: HttpClient) { }

    getItemTypes(): Observable<Item[]> {
        return this.http.get<Item[]>(this.getItemsUrl);
    }

}
