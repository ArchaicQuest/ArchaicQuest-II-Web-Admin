import {
    CharacterActionTypes,
    CharacterActions,
    DecreaseArmour
} from './character.actions';
import { v4 } from 'uuid';
import { CharacterState } from '../character.state';


const intitalState: CharacterState = {
    inventory: [],
    mob: {
        armorRating: {
            armour: 0,
            magic: 0.
        },
        alignmentScore: 0,
        attributes: null,
        className: "",
        description: "",
        gender: "",
        level: "1",
        maxAttributes: null,
        maxStats: null,
        name: "",
        longName: "",
        race: "",
        stats: null,


    }
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

            return {
                ...state,
                inventory: [...state.inventory.slice(0, action.itemIndex),
                ...state.inventory.slice(action.itemIndex + 1)]
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
        case CharacterActionTypes.IncreaseArmour: {
            return {
                ...state,
                mob: {
                    ...state.mob,
                    armorRating: {
                        armour: state.mob.armorRating.armour + action.payload,
                        magic: 0
                    }
                }
            };
        }
        case CharacterActionTypes.DecreaseArmour: {
            return {
                ...state,
                mob: {
                    ...state.mob,
                    armorRating: {
                        armour: state.mob.armorRating.armour - action.payload,
                        magic: 0
                    }
                }
            };
        }
        default: {
            return state;
        }

    }
}
