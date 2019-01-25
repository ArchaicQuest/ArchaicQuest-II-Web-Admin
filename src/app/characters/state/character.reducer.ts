import {
  CharacterActionTypes,
  CharacterActions
} from './character.actions';
import { Item } from '../../items/interfaces/item.interface';

export interface ICharacterState {
  inventory: Item[];
}

const intitalState: ICharacterState = {
  inventory: []
};

export function characterReducer(
  state: ICharacterState = intitalState,
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
  }
}
