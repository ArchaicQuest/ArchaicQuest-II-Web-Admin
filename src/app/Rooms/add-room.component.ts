import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { RoomService } from './add-room.service';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    take,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { CharacterAppState } from '../characters/state/character.state';


@Component({
    templateUrl: './add-room.component.html'
})
export class AddRoomComponent implements OnInit {
    addRoomForm: FormGroup;
    constructor(
        private roomServices: RoomService,
        private store: Store<CharacterAppState>,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private formBuilder: FormBuilder
    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addRoomForm = this.roomServices.addRoomForm;
    }

    triggerDescriptionResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    addRoom() { }


}

