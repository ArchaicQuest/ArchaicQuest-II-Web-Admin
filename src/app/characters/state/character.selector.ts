import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from '../character.state';

const getCharacterState = createFeatureSelector<CharacterState>('character');

export const getInventory = createSelector(getCharacterState, state => state.inventory);

export const getAC = createSelector(getCharacterState, state => state.mob.armorRating);
