import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemType } from '../interfaces/item-type.interface';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private host = 'http://localhost:57814/api/';
    private armourTypeUrl = `${this.host}item/ReturnArmourTypes`;
    private attackTypeUrl = `${this.host}item/ReturnAttackTypes`;
    private damageTypeUrl = `${this.host}item/ReturnDamageTypes`;
    private itemTypeUrl = `${this.host}item/ReturnItemTypes`;
    private itemSlotUrl = `${this.host}item/ReturnSlotTypes`;
    private weaponTypeUrl = `${this.host}item/ReturnWeaponTypes`;
    private flagTypeUrl = `${this.host}item/ReturnFlagTypes`;
    private addItemUrl = `${this.host}item/PostItem`;
    private autoCompleteUrl = `${this.host}item//FindItems?query=`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient) { }

    getItemTypes(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.itemTypeUrl);
    }

    getItemSlot(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.itemSlotUrl);
    }

    getWeaponTypes(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.weaponTypeUrl);
    }

    getDamageTypes(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.damageTypeUrl);
    }

    getAttackTypes(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.attackTypeUrl);
    }

    getArmourTypes(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.armourTypeUrl);
    }

    getFlagTypes(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.flagTypeUrl);
    }

    autocompleteItems(query: string): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(`${this.autoCompleteUrl}${query}`);
    }


    addItem(item: Item): any {
        console.log("post this ", item);
        return this.http.post(this.addItemUrl, JSON.stringify(item), { headers: this.headers, responseType: 'text' });
    }

}
