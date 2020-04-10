import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { MatExpansionPanel } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { SidenavState, selectSidenavVisibility } from './state/side-nav-state';
import { ToggleSideNavSuccessAction } from './state/side-nav-actions';
import { SharedService } from '../shared/shared.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, AfterViewInit {
    showNav = true;
    expanded$: Observable<boolean>;
    @ViewChildren(MatExpansionPanel)
    viewPanels: QueryList<MatExpansionPanel>;

    constructor(private _store$: Store<SidenavState>, private _sharedService: SharedService, private _toast: ToastrService) { }

    ngOnInit() {
        this.expanded$ = this._store$.pipe(select(selectSidenavVisibility));
    }

    showSidenavIfAuth() {
        //show nav if logged in
    }

    clearRoomCache() {
        this._sharedService.updateRoomCache().pipe(take(1)).subscribe((val) => {
            console.log(val);
            this._toast.success(JSON.parse(val).toast);
        });
    }


    toggleSideNavPanelState(sidenavState: boolean) {
        // this.viewPanels.forEach(panel => {
        //     if (panel.expanded && !sidenavState) {
        //         panel.close();
        //     }
        // });
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
