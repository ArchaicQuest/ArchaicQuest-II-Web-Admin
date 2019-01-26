import {
    CharacterActionTypes,
    CharacterActions
} from './character.actions';
import { CharacterState } from '../character.state';


const intitalState: CharacterState = {
    inventory: []
};

export function characterReducer(state: CharacterState = intitalState,
    action: CharacterActions
) {
    switch (action.type) {
        case CharacterActionTypes.AddToInventory: {
            state.inventory.push(action.payload);
            return {
                ...state,
                inventory: [...state.inventory]
            };
        }
        case CharacterActionTypes.RemoveFromInventory: {
            state.inventory.push(action.payload);
            return {
                ...state,
                inventory: [...state.inventory]
            };
        }

        case CharacterActionTypes.UpdateInventorySuccess: {
            return {
                ...state,
                inventory: [...state.inventory]
            };
        }
    }
}
