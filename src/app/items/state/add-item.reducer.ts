import { AddItemActionTypes, AddItemActions } from './add-item.actions';
import { ItemState } from '../item.state';

const intitalState: ItemState = {
    items: [],
    itemTypes: [],
    itemSlots: [],
    armourTypes: [],
    weaponTypes: [],
    attackTypes: [],
    damageTypes: [],
    flags: [],
    loading: true
};

export function addItemReducer(state: ItemState = intitalState, action: AddItemActions) {
    switch (action.type) {
        case AddItemActionTypes.GetItemTypes: {
            return {
                ...state,
                loading: true
            };
        }
        case AddItemActionTypes.GetItemTypesSuccess: {
            return {
                ...state,
                itemTypes: action.payload,
                loading: false
            };
        }
        case AddItemActionTypes.GetItemSlotTypes: {
            return {
                ...state,
                loading: true
            };
        }
        case AddItemActionTypes.GetItemSlotTypesSuccess: {
            return {
                ...state,
                itemSlots: action.payload,
                loading: false
            };
        }
        case AddItemActionTypes.GetItemArmourTypes: {
            return {
                ...state,
                loading: true
            };
        }
        case AddItemActionTypes.GetItemArmourTypesSuccess: {
            return {
                ...state,
                armourTypes: action.payload,
                loading: false
            };
        }
        case AddItemActionTypes.GetItemAttackTypes: {
            return {
                ...state,
                loading: true
            };
        }
        case AddItemActionTypes.GetItemAttackTypesSuccess: {
            return {
                ...state,
                attackTypes: action.payload,
                loading: false
            };
        }
        case AddItemActionTypes.GetItemDamageTypes: {
            return {
                ...state,
                loading: true
            };
        }
        case AddItemActionTypes.GetItemDamageTypesSuccess: {
            return {
                ...state,
                damageTypes: action.payload,
                loading: false
            };
        }
        case AddItemActionTypes.GetItemWeaponTypes: {
            return {
                ...state,
                loading: true
            };
        }
        case AddItemActionTypes.GetItemWeaponTypesSuccess: {
            return {
                ...state,
                weaponTypes: action.payload,
                loading: false
            };
        }
        case AddItemActionTypes.GetItemFlags: {
            return {
                ...state,
                loading: true
            };
        }
        case AddItemActionTypes.GetItemFlagsSuccess: {
            return {
                ...state,
                flags: action.payload,
                loading: false
            };
        }
        case AddItemActionTypes.PostItemSuccess: {
            return {
                ...state,
                loading: false
            };
        }

    }
}
