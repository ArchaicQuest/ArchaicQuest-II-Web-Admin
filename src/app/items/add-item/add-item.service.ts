import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemType } from '../interfaces/item-type.interface';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FlagEnum } from '../interfaces/flags.enums';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private host = environment.hostAPI;
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
    private containerSizeUrl = `${this.host}item/containersize`;
    private LockStrengthUrl = `${this.host}item/LockStrength`;
    private findItemByIdUrl = `${this.host}item/FindItemById?id=`;
    private findKeyByIdUrl = `${this.host}item/FindKeyById?id=`;

    public addItemForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        knownByName: [''],
        itemType: ['', Validators.required],
        itemSlotType: [''],
        level: [''],
        weaponType: [''],
        attackType: [''],
        damageType: ['', Validators.required],
        minDamage: ['', [Validators.min(1), Validators.max(50)]],
        maxDamage: ['', [Validators.min(1), Validators.max(100)]],
        armourType: [''],
        acPierce: [''],
        acBash: [''],
        acSlash: [''],
        acMagic: [''],
        hitRoll: [''],
        damRoll: [''],
        saves: [''],
        hpMod: [''],
        manaMod: [''],
        movesMod: [''],
        spellMod: [''],
        pageCount: [1],
        pages: new FormGroup({}),
        flags: new FormGroup({}),
        lookDescription: ['', Validators.required],
        roomDescription: [''],
        examDescription: [''],
        smellDescription: [''],
        touchDescription: [''],
        tasteDescription: [''],
        selectContainerItem: [''],
        containerGP: [''],
        containerOpen: [''],
        containerLocked: [''],
        containerCanLock: [''],
        containerCanOpen: [''],
        lockStrength: [''],
        containerSize: [''],
        selectContainerKey: ['']
    });

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

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
        return this.http.get<Item[]>(`${this.findKeyUrl}${query}`);
    }

    findKeyById(id: string): Observable<Item> {
        return this.http.get<Item>(`${this.findKeyByIdUrl}${id}`);
    }

    findItemById(id: string): Observable<Item> {
        return this.http.get<Item>(`${this.findItemByIdUrl}${id}`);
    }

    getAddItemForm() {
        return this.addItemForm;
    }

    hasFlag(flag: number, selectedFlag: FlagEnum): boolean {


        if (flag === FlagEnum.Bless && this.isFlagSet(selectedFlag, FlagEnum.Bless)) {
            return true;
        } else if (flag === FlagEnum.Evil && this.isFlagSet(selectedFlag, FlagEnum.Evil)) {
            return true;
        } else if (flag === FlagEnum.Antievil && this.isFlagSet(selectedFlag, FlagEnum.Antievil)) {
            return true;
        } else if (flag === FlagEnum.Antigood && this.isFlagSet(selectedFlag, FlagEnum.Antigood)) {
            return true;
        } else if (flag === FlagEnum.Antineutral && this.isFlagSet(selectedFlag, FlagEnum.Antineutral)) {
            return true;
        } else if (flag === FlagEnum.Container && this.isFlagSet(selectedFlag, FlagEnum.Container)) {
            return true;
        } else if (flag === FlagEnum.Cursed && this.isFlagSet(selectedFlag, FlagEnum.Cursed)) {
            return true;
        } else if (flag === FlagEnum.Equipable && this.isFlagSet(selectedFlag, FlagEnum.Equipable)) {
            return true;
        } else if (flag === FlagEnum.Glow && this.isFlagSet(selectedFlag, FlagEnum.Glow)) {
            return true;
        } else if (flag === FlagEnum.Holy && this.isFlagSet(selectedFlag, FlagEnum.Holy)) {
            return true;
        } else if (flag === FlagEnum.Hum && this.isFlagSet(selectedFlag, FlagEnum.Hum)) {
            return true;
        } else if (flag === FlagEnum.Invis && this.isFlagSet(selectedFlag, FlagEnum.Invis)) {
            return true;
        } else if (flag === FlagEnum.Nodrop && this.isFlagSet(selectedFlag, FlagEnum.Nodrop)) {
            return true;
        } else if (flag === FlagEnum.Nolocate && this.isFlagSet(selectedFlag, FlagEnum.Nolocate)) {
            return true;
        } else if (flag === FlagEnum.Noremove && this.isFlagSet(selectedFlag, FlagEnum.Noremove)) {
            return true;
        } else if (flag === FlagEnum.QuestItem && this.isFlagSet(selectedFlag, FlagEnum.QuestItem)) {
            return true;
        } else if (flag === FlagEnum.Vampric && this.isFlagSet(selectedFlag, FlagEnum.Vampric)) {
            return true;
        }

        return false;
    }

    private isFlagSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }

    addItem(item: Item): any {
        console.log("post this ", item);
        return this.http.post(this.addItemUrl, JSON.stringify(item), { headers: this.headers, responseType: 'text' });
    }

}
