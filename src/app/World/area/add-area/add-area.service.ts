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
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class AreaService {
    private host = `${environment.hostAPI}`;
    private saveAreaUrl = `${this.host}World/Area`;
    private uploadAreaUrl = `${this.host}World/Area/UploadArea`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder, private toast: ToastrService) { }

    public addAreaForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
    });

    saveArea(data: Area) {

        this.http.post(this.saveAreaUrl, JSON.stringify(data), { headers: this.headers, responseType: 'text' })
            .subscribe(
                response => {
                    this.toast.success(`Area ${data.title} saved successfully.`);
                },
                err => console.log(err)
            );
    }

    uploadFile(file: File) {
        const headers = new HttpHeaders();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Disposition', 'multipart/form-data');
        // headers.append('Accept', 'application/json');
        debugger;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        this.http.post(`${this.uploadAreaUrl}`, formData, { headers: headers })
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            );
    }

}
