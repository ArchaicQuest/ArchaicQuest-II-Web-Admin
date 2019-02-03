import { Action } from '@ngrx/store';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';

export enum CharacterActionTypes {
    AddToInventory = '[Character] Add Item to Inventory',
    RemoveFromInventory = '[Character] Remove Item from Inventory',
    UpdateInventorySuccess = '[Character] Inventory update success',
    GetInventorySuccess = '[Character] Inventory update success',
    SaveCharacter = '[Character] Save Character',
    SaveCharacterSuccess = '[Character] Save Character success',
}

export class AddToInventory implements Action {
    readonly type = CharacterActionTypes.AddToInventory;
    constructor(public payload: Item) { }
}
export class RemoveFromInventory implements Action {
    readonly type = CharacterActionTypes.RemoveFromInventory;
    constructor(public payload: Item) { }
}

export class InventoryUpdateSuccess implements Action {
    readonly type = CharacterActionTypes.UpdateInventorySuccess;
    constructor() { }
}

export class GetInventory implements Action {
    readonly type = CharacterActionTypes.UpdateInventorySuccess;
    constructor() { }
}
export class SaveChar implements Action {
    readonly type = CharacterActionTypes.SaveCharacter;
    constructor(public payload: Mob) { }
}
export class SaveCharSuccess implements Action {
    readonly type = CharacterActionTypes.SaveCharacterSuccess;

}


export type CharacterActions = AddToInventory
    | RemoveFromInventory
    | InventoryUpdateSuccess
    | GetInventory
    | SaveChar
    | SaveCharSuccess;

