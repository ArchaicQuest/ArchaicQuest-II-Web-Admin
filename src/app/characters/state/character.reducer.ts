import {
    CharacterActionTypes,
    CharacterActions
} from './character.actions';
import { v4 } from 'uuid';
import { CharacterState } from '../character.state';


const intitalState: CharacterState = {
    inventory: [],
    mob: null
};

export function characterReducer(state: CharacterState = intitalState,
    action: CharacterActions
) {
    switch (action.type) {
        case CharacterActionTypes.AddToInventory: {
            state.inventory.push(action.payload);

            const updateUuid = () => {
                return state.inventory.map(i => {
                    const temp = { ...i };
                    if (temp.uuid == null) {
                        temp.uuid = v4();
                    }
                    return temp;
                });
            };

            return {
                ...state,
                inventory: [...updateUuid()]
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
        case CharacterActionTypes.SaveCharacter: {
            return {
                ...state,
                mob: action.payload
            };
        }
        case CharacterActionTypes.SaveCharacterSuccess: {
            return {
                ...state,
                mob: state.mob,
                inventory: [...state.inventory]
            };
        }

        default: {
            return state;
        }

    }
}
