import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatExpansionPanel } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { SidenavState, selectSidenavVisibility } from './state/side-nav-state';
import { ToggleSideNavSuccessAction } from './state/side-nav-actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, AfterViewInit {
  showNav = true;
  expanded$: Observable<boolean>;
  @ViewChildren(MatExpansionPanel)
  viewPanels: QueryList<MatExpansionPanel>;

  constructor( private _store$: Store<SidenavState>) {  }

  ngOnInit() {
    this.expanded$ = this._store$.pipe(select(selectSidenavVisibility));
  }

  showSidenavIfAuth() {
   //show nav if logged in
  }


  toggleSideNavPanelState(sidenavState: boolean) {
    this.viewPanels.forEach(panel => {
      if (panel.expanded && !sidenavState) {
        panel.close();
      }
    });
  }

  ngAfterViewInit() {
    this.expanded$.subscribe(e => {
      this.toggleSideNavPanelState(e);
    });
  }

  toggleSidenav(forceOpen?: boolean) {
    this._store$.dispatch(new ToggleSideNavSuccessAction(forceOpen));
  }

  logout(event) {
  // log out
  }

}
