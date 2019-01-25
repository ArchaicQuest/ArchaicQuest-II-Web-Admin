import { Action } from '@ngrx/store';
import { Item } from 'src/app/items/interfaces/item.interface';

export enum CharacterActionTypes {
    AddToInventory = '[Character] Add Item to Inventory',
    RemoveFromInventory = '[Character] Remove Item from Inventory',
}

export class AddToInventory implements Action {
    readonly type = CharacterActionTypes.AddToInventory;
    constructor(public payload: Item) { }
}
export class RemoveFromInventory implements Action {
  readonly type = CharacterActionTypes.RemoveFromInventory;
  constructor(public payload: Item) { }
}

export type CharacterActions = AddToInventory | RemoveFromInventory;

