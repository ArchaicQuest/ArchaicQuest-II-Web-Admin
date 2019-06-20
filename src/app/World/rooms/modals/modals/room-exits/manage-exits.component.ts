import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/items/interfaces/item.interface';
import { RoomExitService } from './manage-exits.service';
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: './manage-exits.component.html'
})
export class ManageExitsComponent implements OnInit {
    public exitDirection: string;
    public form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ManageExitsComponent>,
        public exitService: RoomExitService,
        @Inject(MAT_DIALOG_DATA) public data: {
            exit: string,
        }) {
        this.form = this.exitService.addExitForm;
    }



    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.exitDirection = this.data.exit;
    }


    addExit() {


    }


}

