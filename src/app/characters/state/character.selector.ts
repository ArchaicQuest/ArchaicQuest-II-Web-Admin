import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from '../character.state';

const getCharacterState = createFeatureSelector<CharacterState>('character');

export const getInventory = createSelector(getCharacterState, state => state.mob.inventory);

export const getAC = createSelector(getCharacterState, state => state.mob.armorRating);
