import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface SidenavState {
  visible: boolean;
  isAuth: boolean
}

export const sidenavInitialState: SidenavState = {
  visible: false,
  isAuth: false
};

export const selectSidenavState = createFeatureSelector<SidenavState>('sidenav');
export const selectSidenavVisibility = createSelector(selectSidenavState, (state: SidenavState) => state.visible);
export const selectSidenavIsAuth = createSelector(selectSidenavState, (state: SidenavState) => state.isAuth);
