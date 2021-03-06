
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './interface/user.interface';
import { Observable } from 'rxjs';
import { Log } from './interface/log.interface';


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

    deleteUser(id: number) {
        return this.http.post<User>(`${environment.hostAPI}Account/deleteuser`, id);
    }

    addUser(username: string, password: string, role: string) {
        return this.http.post<User>(`${environment.hostAPI}Account/adduser`, { username, password, role });
    }

    editUser(id: number, username: string, password: string, role: string) {
        return this.http.post<User>(`${environment.hostAPI}Account/edituser`, { id, username, password, role });

    }

    getLogs(): Observable<Log[]> {
        return this.http.get<Log[]>(`${environment.hostAPI}Account/logs`);
    }
}