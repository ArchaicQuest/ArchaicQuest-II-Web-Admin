import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MobService } from './add-mob.service';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../characters/interfaces/gender.interface';
import { MatSelectChange } from '@angular/material';
import { Race } from '../characters/interfaces/race.interface';
import { Class } from '../characters/interfaces/class.interface';


@Component({
    templateUrl: './add-mob.component.html',
})
export class AddMobComponent implements OnInit {
    addMobForm: FormGroup;
    races: Race[];
    classes: Class[];
    genders: Gender[];
    constructor(
        private mobService: MobService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.addMobForm = this.mobService.getAddMobForm();
        this.genders = this.mobService.getGender();
        this.races = this.mobService.getRaces();
        this.classes = this.mobService.getClasses();
    }

    selectGender(data: MatSelectChange) {
        console.log('gender', data.value);
    }

    selectRace(data: MatSelectChange) {
        console.log('race', data.value);
    }

    selectClass(data: MatSelectChange) {
        console.log('class', data.value);
    }

    addMob() {

    }

}
