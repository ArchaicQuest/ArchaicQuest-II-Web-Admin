import { Action } from '@ngrx/store';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { EqSlot } from '../equipment/equipment.enum';

export enum CharacterActionTypes {
    AddToInventory = '[Character] Add Item to Inventory',
    RemoveFromInventory = '[Character] Remove Item from Inventory',
    AddToEquipment = '[Character] Add Item to equipment',
    UpdateEquipment = '[Character] Update equipment',
    UpdateEquipped = '[Character] Update equipped item',
    RemoveEquipment = '[Character] Remove equipment',
    RemoveFromEquipment = '[Character] Remove Item from equipment',
    IncreaseArmour = '[Character] Increase Armour value',
    DecreaseArmour = '[Character] Decrease Armour value',
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
    constructor(public itemIndex: number) { }
}

export class InventoryUpdateSuccess implements Action {
    readonly type = CharacterActionTypes.UpdateInventorySuccess;
    constructor() { }
}
export class UpdateEquipment implements Action {
    readonly type = CharacterActionTypes.UpdateEquipment;
    constructor(public payload: {
        slot: EqSlot,
        item: Item
    }) { }
}

export class UpdateEquipped implements Action {
    readonly type = CharacterActionTypes.UpdateEquipped;
    constructor(public payload: {
        slot: EqSlot,
        item: Item
    }) { }
}

export class RemoveEquipment implements Action {
    readonly type = CharacterActionTypes.RemoveEquipment;
    constructor(public payload: {
        slot: EqSlot,
        item: Item
    }) { }
}
export class AddToEquipment implements Action {
    readonly type = CharacterActionTypes.AddToEquipment;
    constructor(public payload: Item) { }
}
export class RemoveFromEquipment implements Action {
    readonly type = CharacterActionTypes.RemoveFromEquipment;
    constructor(public itemIndex: number) { }
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

export class IncreaseArmour implements Action {
    readonly type = CharacterActionTypes.IncreaseArmour;
    constructor(public payload: number) { }
}
export class DecreaseArmour implements Action {
    readonly type = CharacterActionTypes.DecreaseArmour;
    constructor(public payload: number) { }
}


export type CharacterActions = AddToInventory
    | RemoveFromInventory
    | InventoryUpdateSuccess
    | AddToEquipment
    | RemoveFromEquipment
    | UpdateEquipment
    | RemoveEquipment
    | GetInventory
    | SaveChar
    | SaveCharSuccess
    | IncreaseArmour
    | DecreaseArmour
    | UpdateEquipped;

