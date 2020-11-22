import {
    FormBuilder
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interface/user.interface';

@Injectable({
    providedIn: 'root'
})
/*
  todo
  ----
  money
  inventory / Worn / wielded items
  active affects
  emotes
*/
export class LoginService {
    private host = `${environment.hostAPI}`;
    private authUrl = `${this.host}Account/authenticate`;


    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) { }





}
