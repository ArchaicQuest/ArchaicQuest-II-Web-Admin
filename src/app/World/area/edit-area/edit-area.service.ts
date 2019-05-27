import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Area } from '../interface/area.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class EditService {
    private host = `${environment.hostAPI}`;
    private saveAreaUrl = `${this.host}World/Area`;
    private getAreaUrl = `${this.host}World/Area`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    public addAreaForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
    });



    getArea(id: Area) {
        return this.http.get<Area>(`${this.getAreaUrl}/${id}`);
    }

    updateArea(data: Area) {

        console.log('post this ', this.saveAreaUrl, data);
        this.http.put(`${this.getAreaUrl}/${data.id}`, JSON.stringify(data), { headers: this.headers, responseType: 'text' })
            .subscribe(
                response => console.log(response),
                err => console.log(err)
            );
    }

}
