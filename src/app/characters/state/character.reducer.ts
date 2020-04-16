import {
    CharacterActionTypes,
    CharacterActions,
    DecreaseArmour,
    RemoveEquipment
} from './character.actions';
import { v4 } from 'uuid';
import { CharacterState } from '../character.state';
import { EquipmentComponent } from '../equipment/equipment.component';
import { EqSlot } from '../equipment/equipment.enum';


const intitalState: CharacterState = {
    mob: {
        armorRating: {
            armour: 0,
            magic: 0.
        },
        inventory: [],
        equipped: {
            arms: null,
            body: null,
            face: null,
            feet: null,
            finger2: null,
            finger: null,
            floating: null,
            hands: null,
            head: null,
            held: null,
            legs: null,
            light: null,
            neck2: null,
            neck: null,
            sheathed: null,
            shield: null,
            torso: null,
            waist: null,
            wield: null,
            wrist2: null,
            wrist: null
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
        defaultAttack: ''


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

        case CharacterActionTypes.UpdateEquipped: {


            const updatedEquipment = EquipmentComponent.mapItemToEQSlot(action.payload.slot, action.payload.item, state.mob.equipped);

            return {
                ...state,
                mob: {
                    ...state.mob,
                    equipped: updatedEquipment
                }
            };
        }
        case CharacterActionTypes.RemoveEquipment: {

            debugger;

            let getItem = EquipmentComponent.returnEQ(action.payload.slot, state.mob.equipped)
            let updatedEquipment = EquipmentComponent.mapItemToEQSlot(action.payload.slot, action.payload.item, state.mob.equipped);

            if (action.payload.slot === EqSlot.Wielded && getItem == null) {
                getItem = EquipmentComponent.returnEQ(EqSlot.Sheathed, state.mob.equipped);
                updatedEquipment = EquipmentComponent.mapItemToEQSlot(EqSlot.Sheathed, action.payload.item, state.mob.equipped);
            }


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
