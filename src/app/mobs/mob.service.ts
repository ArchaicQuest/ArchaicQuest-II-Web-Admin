import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Option } from '../shared/interfaces/option.interface';
import { Observable } from 'rxjs';
import { Mob } from './interfaces/mob.interface';

@Injectable({
  providedIn: 'root'
})

export class MobService {
  private host = `${environment.hostAPI}`;
  private autoCompleteUrl = `${this.host}/character/Mob?query=`;


  constructor(private http: HttpClient) { }

  autocompleteMobs(query: string): Observable<Mob[]> {
    return this.http.get<Mob[]>(`${this.autoCompleteUrl}${query}`);
}
}
