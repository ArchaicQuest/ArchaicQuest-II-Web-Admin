import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/items/interfaces/item.interface';
import { RoomExitService } from './manage-exits.service';
import { FormGroup } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Coords } from 'src/app/shared/interfaces/coords.interface';

@Component({
    templateUrl: './manage-exits.component.html'
})
export class ManageExitsComponent implements OnInit {
    public exitDirection: string;
    public currentCoord: Coords;
    public form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ManageExitsComponent>,
        public exitService: RoomExitService,
        public toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {
            exit: string,
            currentCoord: Coords
        }) {
        this.form = this.exitService.addExitForm;
    }



    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.exitDirection = this.data.exit;
        this.currentCoord = JSON.parse(JSON.stringify(this.data.currentCoord));

        console.log(this.data.currentCoord);

        console.log(this.exitService.setExitCoord(this.exitDirection, this.currentCoord));
    }


    addExit() {

        this.toastr.success(`Exit added successfully.`);

        this.dialogRef.close(this.exitService.returnExitObj());

    }


}

