import { Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gender } from '../characters/interfaces/gender.interface';
import { GenderEnum } from '../characters/enums/gender.enum';

@Injectable({
  providedIn: 'root'
})
export class MobService {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  public addMobForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    gender: ['', Validators.required],
    race: ['', Validators.required],
    class: ['', Validators.required],
    level: ['', Validators.required]
  });

  getAddMobForm() {
    return this.addMobForm;
  }

  getGender(): Gender[] {
    return [
      {
        Name: 'None',
        Id: GenderEnum.None
      },
      {
        Name: 'Male',
        Id: GenderEnum.Male
      },
      {
        Name: 'Female',
        Id: GenderEnum.Female
      }
    ];
  }
}
