import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    take,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AreaService } from './add-area.service';
import { Area } from '../interface/area.interface';


@Component({
    templateUrl: './add-area.component.html'
})
export class AddAreaComponent implements OnInit {
    addRoomForm: FormGroup;
    fileName: string;
    file: File;
    constructor(
        private areaServices: AreaService,
        private ngZone: NgZone,
    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addRoomForm = this.areaServices.addAreaForm;
    }

    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    addArea() {

        const data: Area = {
            id: -1,
            title: this.addRoomForm.get('title').value,
            description: this.addRoomForm.get('description').value,
            rooms: []
        };

        this.areaServices.saveArea(data);
    }

    fileChange(event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.file = fileList[0];
            this.fileName = this.file.name;
        }
    }

    uploadToServer() {
        console.log(1)
        this.areaServices.uploadFile(this.file);

    }

}

