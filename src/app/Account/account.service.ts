
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './interface/user.interface';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AccountService {
    private host = `${environment.hostAPI}`;
    private getUsersUrl = `${this.host}Account/getusers`;


    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) { }


    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.getUsersUrl);
    }

    deleteUser(id: number): Observable<User[]> {
        return this.http.get<User[]>(this.getUsersUrl);
    }


}
