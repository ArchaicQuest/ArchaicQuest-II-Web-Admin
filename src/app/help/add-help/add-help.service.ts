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
    private itemTypeUrl = `${this.host}item/ReturnItemTypes`;
    private addItemUrl = `${this.host}item/PostItem`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient, private toast: ToastrService) { }

    getItemTypes(): Observable<Help[]> {
        return this.http.get<Help[]>(this.itemTypeUrl);
    }


    addItem(item: Help): any {
        setTimeout(() => {
            this.toast.success(`Mob ${item.title} saved successfully.`);
        }, 250);
        return this.http.post(this.addItemUrl, JSON.stringify(item), { headers: this.headers, responseType: 'text' });
    }

}
