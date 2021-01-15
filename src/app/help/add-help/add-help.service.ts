import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Help } from '../interfaces/help.interface';

@Injectable({
    providedIn: 'root'
})
export class HelpService {
    private host = environment.hostAPI;
    private addHelpUrl = `${this.host}help`;
    private getHelpUrl = `${this.host}help/GetHelpById`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient) { }


    add(help: Help): any {

        return this.http.post(this.addHelpUrl, JSON.stringify(help), { headers: this.headers, responseType: 'text' });
    }

    getHelp(id: number): Observable<Help> {
        return this.http.get<Help>(`${this.getHelpUrl}/${id}`);
    }

}
