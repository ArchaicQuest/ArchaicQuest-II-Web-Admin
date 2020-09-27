import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface SidenavState {
  visible: boolean;
}

export const sidenavInitialState: SidenavState = {
  visible: false
};

export const selectSidenavState = createFeatureSelector<SidenavState>('sidenav');
export const selectSidenavVisibility = createSelector(selectSidenavState, (state: SidenavState) => state.visible);
