import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    take,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { EditService } from './edit-area.service';
import { Area } from '../interface/area.interface';


@Component({
    templateUrl: './edit-area.component.html'
})
export class EditAreaComponent implements OnInit {
    addRoomForm: FormGroup;
    area: Area;
    constructor(
        private editAreaServices: EditService,
        private ngZone: NgZone,
        private route: ActivatedRoute
    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addRoomForm = this.editAreaServices.addAreaForm;

        this.editAreaServices.getArea(this.route.snapshot.params['id']).subscribe(data => {
            this.addRoomForm.patchValue({
                id: data.id,
                title: data.title,
                description: data.description
            });

            this.area = {
                'id': data.id,
                'title': data.title,
                'description': data.description,
                'dateCreated': data.dateCreated,
                'dateUpdated': data.dateUpdated,
                'createdBy': data.createdBy,
                'modifiedBy': null,
                'rooms': data.rooms
            };
        });
    }

    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    updateArea() {

        this.area.title = this.addRoomForm.get('title').value;
        this.area.description = this.addRoomForm.get('description').value;


        this.editAreaServices.updateArea(this.area);
    }

}

