import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MobService } from './add-mob.service';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../characters/interfaces/gender.interface';
import { MatSelectChange } from '@angular/material';
import { Race } from '../characters/interfaces/race.interface';
import { Class } from '../characters/interfaces/class.interface';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Alignment } from '../characters/interfaces/alignment.interface';


@Component({
    templateUrl: './add-mob.component.html',
})
export class AddMobComponent implements OnInit {
    addMobForm: FormGroup;
    races: Race[];
    classes: Class[];
    genders: Gender[];
    alignments: Alignment[];
    constructor(
        private mobService: MobService,
        private route: ActivatedRoute,
        private ngZone: NgZone
    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addMobForm = this.mobService.getAddMobForm();
        this.genders = this.mobService.getGender();
        this.races = this.mobService.getRaces();
        this.classes = this.mobService.getClasses();
        this.alignments = this.mobService.getAlignment();
    }


  triggerDescriptionResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
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

    selectAlignment(data: MatSelectChange) {
      console.log('alignment', data.value);
  }

    addMob() {

    }

}
