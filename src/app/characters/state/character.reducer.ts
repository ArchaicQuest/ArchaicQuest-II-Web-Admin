import {
    CharacterActionTypes,
    CharacterActions
} from './character.actions';
import { v4 } from 'uuid';
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

        case CharacterActionTypes.SaveCharacterSuccess: {
            return {
                ...state,
                inventory: [...state.inventory]
            };
        }

        default: {
            return state;
        }

    }
}
