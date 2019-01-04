import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from '../item.state';

const getItemState = createFeatureSelector<ItemState>('item');

export const getItemTypes = createSelector(
    getItemState,
    state => state.itemTypes
);

export const    getItemSlotTypes = createSelector(
    getItemState,
    state => state.itemSlots
);

export const getArmourTypes = createSelector(
    getItemState,
    state => state.armourTypes
);

export const getWeaponTypes = createSelector(
    getItemState,
    state => state.weaponTypes
);

export const getAttackTypes = createSelector(
    getItemState,
    state => state.attackTypes
);

export const getDamageTypes = createSelector(
    getItemState,
    state => state.damageTypes
);

export const getFlags = createSelector(
    getItemState,
    state => state.flags
);
