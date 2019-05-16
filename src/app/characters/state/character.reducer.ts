import {
    CharacterActionTypes,
    CharacterActions,
    DecreaseArmour,
    RemoveEquipment
} from './character.actions';
import { v4 } from 'uuid';
import { CharacterState } from '../character.state';
import { EquipmentComponent } from '../equipment/equipment.component';


const intitalState: CharacterState = {
    mob: {
        armorRating: {
            armour: 0,
            magic: 0.
        },
        inventory: [],
        equipped: {
            armsEq: null,
            bodyEq: null,
            faceEq: null,
            feetEq: null,
            finger2Eq: null,
            fingerEq: null,
            floatingEq: null,
            handsEq: null,
            headEq: null,
            heldEq: null,
            legsEq: null,
            lightEq: null,
            neck2Eq: null,
            neckEq: null,
            sheathedEq: null,
            shieldEq: null,
            torsoEq: null,
            waistEq: null,
            wieldEq: null,
            wrist2Eq: null,
            wristEq: null
        },
        alignmentScore: 0,
        attributes: null,
        className: '',
        description: '',
        gender: '',
        level: '1',
        maxAttributes: null,
        maxStats: null,
        name: '',
        longName: '',
        race: '',
        stats: null,
        status: '',


    }
};

export function characterReducer(state: CharacterState = intitalState,
    action: CharacterActions
) {
    switch (action.type) {
        case CharacterActionTypes.AddToInventory: {
            state.mob.inventory.push(action.payload);

            const updateUuid = () => {
                return state.mob.inventory.map(i => {
                    const temp = { ...i };
                    if (temp.uuid == null) {
                        temp.uuid = v4();
                    }
                    return temp;
                });
            };

            return {
                ...state,
                mob: {
                    ...state.mob,
                    inventory: [...updateUuid()]
                }

            };
        }
        case CharacterActionTypes.RemoveFromInventory: {


            return {
                ...state,
                mob: {
                    ...state.mob,
                    inventory: [...state.mob.inventory.slice(0, action.itemIndex),
                    ...state.mob.inventory.slice(action.itemIndex + 1)],
                }
            };
        }
        case CharacterActionTypes.UpdateEquipment: {

            console.log("wtf")
            debugger;
            const updatedEquipment = EquipmentComponent.mapItemToEQSlot(action.payload.slot, action.payload.item, state.mob.equipped);



            const inventory = state.mob.inventory;
            const itemIndex = inventory.findIndex(x => x.id === action.payload.item.id);
            inventory[itemIndex].equipped = true;


            return {
                ...state,
                mob: {
                    ...state.mob,
                    inventory: [...inventory],
                    equipped: updatedEquipment
                }
            };
        }

        case CharacterActionTypes.RemoveEquipment: {

            debugger;
            const getItem = EquipmentComponent.returnEQ(action.payload.slot, state.mob.equipped)
            const updatedEquipment = EquipmentComponent.mapItemToEQSlot(action.payload.slot, action.payload.item, state.mob.equipped);



            const inventory = state.mob.inventory;

            if (getItem != null) {
                const itemIndex = inventory.findIndex(x => x.id === getItem.id);
                inventory[itemIndex].equipped = false;
            }

            return {
                ...state,
                mob: {
                    ...state.mob,
                    inventory: [...inventory],
                    equipped: updatedEquipment
                }
            };
        }

        case CharacterActionTypes.UpdateInventorySuccess: {
            return {
                ...state,
                mob: {
                    ...state.mob,
                    inventory: [...state.mob.inventory],
                }
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
                mob: {
                    inventory: [...state.mob.inventory]
                }
            };
        }
        case CharacterActionTypes.IncreaseArmour: {
            return {
                ...state,
                mob: {
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
