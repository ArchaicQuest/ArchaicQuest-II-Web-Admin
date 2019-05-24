
import { SidenavState, sidenavInitialState } from "./side-nav-state";
import { SideNavActions, TOGGLE_SIDE_NAV_SUCCESS } from './side-nav-actions';

export function sidenavReducer(state: SidenavState = sidenavInitialState, action: SideNavActions) {
  switch (action.type) {
    case TOGGLE_SIDE_NAV_SUCCESS: {
      return {
        ...state,
        visible: action.payload ? action.payload : !state.visible
      };
    }

    default: {
      return state;
    }
  }
}
