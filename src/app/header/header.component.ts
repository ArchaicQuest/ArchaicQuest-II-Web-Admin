import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SidenavState } from '../side-nav/state/side-nav-state';
import { ToggleSideNavSuccessAction } from '../side-nav/state/side-nav-actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private _store$: Store<SidenavState>) {
  }

  toggleSidebar() {
    this._store$.dispatch(new ToggleSideNavSuccessAction());
  }
}
