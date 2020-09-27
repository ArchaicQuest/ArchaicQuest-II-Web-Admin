import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private host = environment.hostAPI;
    private updateRoomCacheURL = `${this.host}World/Room/updateCache`;


    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });


    constructor(private http: HttpClient) { }

    updateRoomCache(): Observable<any> {
        return this.http.post(this.updateRoomCacheURL, {}, { headers: this.headers, responseType: 'text' });
    }

}
