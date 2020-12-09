export const TOGGLE_SIDE_NAV = 'TOGGLE_SIDE_NAV';
export const TOGGLE_SIDE_NAV_SUCCESS = 'TOGGLE_SIDE_NAV_SUCCESS';

export const TOGGLE_SIDE_NAV_IS_AUTH = 'TOGGLE_SIDE_NAV_IS_AUTH';
export const TOGGLE_SIDE_NAV_IS_AUTH_SUCCESS = 'TOGGLE_SIDE_NAV_IS_AUTH_SUCCESS';


export class ToggleSideNavSuccessAction {
  readonly type = TOGGLE_SIDE_NAV_SUCCESS;
  constructor(public payload?: boolean) {
  }
}


export class ToggleSideNavIsAuthSuccessAction {
  readonly type = TOGGLE_SIDE_NAV_IS_AUTH_SUCCESS;
  constructor(public payload?: boolean) {
  }
}
export type SideNavActions
  = ToggleSideNavSuccessAction | ToggleSideNavIsAuthSuccessAction;
