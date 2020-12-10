import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './interface/user.interface';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { SidenavState } from '../side-nav/state/side-nav-state';
import { ToggleSideNavIsAuthSuccessAction } from '../side-nav/state/side-nav-actions';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private _store$: Store<SidenavState>, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.hostAPI}Account/authenticate`, { username, password })
            .pipe(map(user => {

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                this._store$.dispatch(new ToggleSideNavIsAuthSuccessAction(user != null))
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this._store$.dispatch(new ToggleSideNavIsAuthSuccessAction(false));
        location.href = "account/login";
    }
}