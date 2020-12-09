import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Store, select } from '@ngrx/store';
import { SidenavState, selectSidenavVisibility, selectSidenavIsAuth } from './state/side-nav-state';
import { ToggleSideNavIsAuthSuccessAction, ToggleSideNavSuccessAction } from './state/side-nav-actions';
import { SharedService } from '../shared/shared.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../account/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, AfterViewInit {
    showNav$: Observable<boolean>;
    expanded$: Observable<boolean>;
    @ViewChildren(MatExpansionPanel)
    viewPanels: QueryList<MatExpansionPanel>;

    constructor(private _store$: Store<SidenavState>, private _sharedService: SharedService, private _toast: ToastrService, private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {


        this.showNav$ = this._store$.pipe(select(selectSidenavIsAuth));
        this.expanded$ = this._store$.pipe(select(selectSidenavVisibility));

        const user = localStorage.getItem("currentUser");

        if (user != null) {
            this._store$.dispatch(new ToggleSideNavIsAuthSuccessAction(true))
        }


    }



    showSidenavIfAuth() {
        //show nav if logged in     
    }

    clearRoomCache() {
        this._sharedService.updateRoomCache().pipe(take(1)).subscribe((val) => {
            this._toast.success(JSON.parse(val).toast);
        });
    }


    toggleSideNavPanelState(sidenavState: boolean) {
        setTimeout(() => {

            this.viewPanels.forEach(panel => {
                if (panel.expanded && !sidenavState) {
                    panel.close();
                }
            });
        })
    }

    ngAfterViewChecked(): void {
        //Called after every check of the component's view. Applies to components only.
        //Add 'implements AfterViewChecked' to the class.


    }

    ngAfterViewInit() {
        this.expanded$.subscribe(e => {
            this.toggleSideNavPanelState(e);
        });

    }

    toggleSidenav(forceOpen?: boolean) {
        setTimeout(() => {
            this._store$.dispatch(new ToggleSideNavSuccessAction(forceOpen));
        });
    }

    logout() {
        this.authenticationService.logout();
    }

}
