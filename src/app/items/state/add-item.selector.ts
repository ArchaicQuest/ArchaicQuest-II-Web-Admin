import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from '../item.state';

const getItemState = createFeatureSelector<ItemState>('item');

export const getItemTypes = createSelector(
    getItemState,
    state => state.itemTypes || null
);

export const getItemSlotTypes = createSelector(
    getItemState,
    state => state.itemSlots || null
);

export const getArmourTypes = createSelector(
    getItemState,
    state => state.armourTypes || null
);

export const getWeaponTypes = createSelector(
    getItemState,
    state => state.weaponTypes || null
);

export const getAttackTypes = createSelector(
    getItemState,
    state => state.attackTypes || null
);

export const getDamageTypes = createSelector(
    getItemState,
    state => state.damageTypes || null
);

export const getFlags = createSelector(
    getItemState,
    state => state.flags || null
);
