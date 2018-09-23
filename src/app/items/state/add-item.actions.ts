import { Action } from '@ngrx/store';
import { ItemType } from '../interfaces/item-type.interface';
import { Item } from '../interfaces/item.interface';

export enum AddItemActionTypes {
    GetItemTypes = '[Add Item] Get Item Types',
    GetItemTypesSuccess = '[Add Item] Get Item Types Success',
    GetItemTypesFail = '[Add Item] Get Item Types Fail',
    GetItemSlotTypes = '[Add Item] Get Slot Types',
    GetItemSlotTypesSuccess = '[Add Item] Get Slot Types Success',
    GetItemSlotTypesFail = '[Add Item] Get Slot Types Fail',
    GetItemArmourTypes = '[Add Item] Get armour Types',
    GetItemArmourTypesSuccess = '[Add Item] Get armour Types Success',
    GetItemArmourTypesFail = '[Add Item] Get armour Types Fail',
    GetItemWeaponTypes = '[Add Item] Get weapon Types',
    GetItemWeaponTypesSuccess = '[Add Item] Get weapon Types Success',
    GetItemWeaponTypesFail = '[Add Item] Get weapon Types Fail',
    GetItemAttackTypes = '[Add Item] Get Attack Types',
    GetItemAttackTypesSuccess = '[Add Item] Get Attack Types Success',
    GetItemAttackTypesFail = '[Add Item] Get Attack Types Fail',
    GetItemDamageTypes = '[Add Item] Get Damage Types',
    GetItemDamageTypesSuccess = '[Add Item] Get Damage Types Success',
    GetItemDamageTypesFail = '[Add Item] Get damage Types Fail',
    GetItemFlags = '[Add Item] Get flags',
    GetItemFlagsSuccess = '[Add Item] Get flags Success',
    GetItemFlagsFail = '[Add Item] Get flags Fail',
    PostItem = '[Post Item] Post Item',
    PostItemSuccess = '[Post Item] Post Item Success',
    PostItemFail = '[Post Item] Post Item Fail'
}

export class GetItemTypes implements Action {
    readonly type = AddItemActionTypes.GetItemTypes;
}

export class GetItemTypesSuccess implements Action {
    readonly type = AddItemActionTypes.GetItemTypesSuccess;

    constructor(public payload: ItemType[]) { }
}

export class GetItemTypesFail implements Action {
    readonly type = AddItemActionTypes.GetItemTypesFail;

    constructor(public payload: string) { }
}
export class GetItemSlotTypes implements Action {
    readonly type = AddItemActionTypes.GetItemSlotTypes;
}

export class GetItemSlotTypesSuccess implements Action {
    readonly type = AddItemActionTypes.GetItemSlotTypesSuccess;

    constructor(public payload: ItemType[]) { }
}

export class GetItemSlotTypesFail implements Action {
    readonly type = AddItemActionTypes.GetItemSlotTypesFail;

    constructor(public payload: string) { }
}

export class GetArmourTypes implements Action {
    readonly type = AddItemActionTypes.GetItemArmourTypes;
}

export class GetArmourTypesSuccess implements Action {
    readonly type = AddItemActionTypes.GetItemArmourTypesSuccess;

    constructor(public payload: ItemType[]) { }
}

export class GetArmourTypesFail implements Action {
    readonly type = AddItemActionTypes.GetItemArmourTypesFail;

    constructor(public payload: string) { }
}

export class GetAttackTypes implements Action {
    readonly type = AddItemActionTypes.GetItemAttackTypes;
}

export class GetAttackTypesSuccess implements Action {
    readonly type = AddItemActionTypes.GetItemAttackTypesSuccess;

    constructor(public payload: ItemType[]) { }
}

export class GetAttackTypesFail implements Action {
    readonly type = AddItemActionTypes.GetItemAttackTypesFail;

    constructor(public payload: string) { }
}

export class GetDamageTypes implements Action {
    readonly type = AddItemActionTypes.GetItemDamageTypes;
}

export class GetDamageTypesSuccess implements Action {
    readonly type = AddItemActionTypes.GetItemDamageTypesSuccess;

    constructor(public payload: ItemType[]) { }
}

export class GetDamgeTypesFail implements Action {
    readonly type = AddItemActionTypes.GetItemDamageTypesFail;

    constructor(public payload: string) { }
}

export class GetFlags implements Action {
    readonly type = AddItemActionTypes.GetItemFlags;
}

export class GetFlagsSuccess implements Action {
    readonly type = AddItemActionTypes.GetItemFlagsSuccess;

    constructor(public payload: ItemType[]) { }
}

export class GetFlagsFail implements Action {
    readonly type = AddItemActionTypes.GetItemFlagsFail;

    constructor(public payload: string) { }
}


export class GetWeaponTypes implements Action {
    readonly type = AddItemActionTypes.GetItemWeaponTypes;
}

export class GetWeaponTypesSuccess implements Action {
    readonly type = AddItemActionTypes.GetItemWeaponTypesSuccess;

    constructor(public payload: ItemType[]) { }
}

export class GetWeaponTypesFail implements Action {
    readonly type = AddItemActionTypes.GetItemWeaponTypesFail;

    constructor(public payload: string) { }
}


export class PostItem implements Action {
    constructor(public payload: Item) { }
    readonly type = AddItemActionTypes.PostItem;
}

export class PostItemSuccess implements Action {
    readonly type = AddItemActionTypes.PostItemSuccess;

}

export class PostItemFail implements Action {
    readonly type = AddItemActionTypes.PostItemFail;

    constructor(public payload: string) { }
}

export type AddItemActions =
    GetItemTypes
    | GetItemTypesSuccess
    | GetItemTypesFail
    | GetItemSlotTypes
    | GetItemSlotTypesSuccess
    | GetItemSlotTypesSuccess
    | GetArmourTypes
    | GetArmourTypesSuccess
    | GetArmourTypesFail
    | GetAttackTypes
    | GetAttackTypesSuccess
    | GetAttackTypesFail
    | GetDamageTypes
    | GetDamageTypesSuccess
    | GetDamgeTypesFail
    | GetWeaponTypes
    | GetWeaponTypesSuccess
    | GetWeaponTypesFail
    | GetFlags
    | GetFlagsSuccess
    | GetFlagsFail
    | PostItem
    | PostItemSuccess
    | PostItemFail;
