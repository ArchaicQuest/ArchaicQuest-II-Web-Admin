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
    private autoCompleteUrl = `${this.host}item/FindItems?query=`;
    private findKeyUrl = `${this.host}item/FindKeys?query=`;
    private containerSizeUrl = `${this.host}/item/containersize`;
    private LockStrengthUrl = `${this.host}/item/LockStrength`;
    private findItemByIdUrl = `${this.host}item/FindItemById?id=`;
    private findKeyByIdUrl = `${this.host}item/FindKeyById?id=`;

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

    getContainerSize(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.containerSizeUrl);
    }

    getLockStrength(): Observable<ItemType[]> {
        return this.http.get<ItemType[]>(this.LockStrengthUrl);
    }

    autocompleteItems(query: string): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.autoCompleteUrl}${query}`);
    }

    findKeyItems(query: string): Observable<Item[]> {
        if (query == null) {
            return;
        }
        return this.http.get<Item[]>(`${this.findKeyUrl}${query}`);
    }

    findKeyById(id: string): Observable<Item> {
        if (id == null) {
            return;
        }
        return this.http.get<Item>(`${this.findKeyByIdUrl}${id}`);
    }

    findItemById(id: string): Observable<Item> {
        return this.http.get<Item>(`${this.findItemByIdUrl}${id}`);
    }

    addItem(item: Item): any {
        console.log("post this ", item);
        return this.http.post(this.addItemUrl, JSON.stringify(item), { headers: this.headers, responseType: 'text' });
    }

}
