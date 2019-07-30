import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';;
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
    public exitCoord: Coords;
    public form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ManageExitsComponent>,
        public exitService: RoomExitService,
        public toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {
            exit: string,
            currentCoord: Coords,
            areaId: number
        }) {
        this.form = this.exitService.addExitForm;
    }



    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.exitDirection = this.data.exit;
        this.currentCoord = JSON.parse(JSON.stringify(this.data.currentCoord));

        this.exitCoord = this.exitService.setExitCoord(this.exitDirection, this.currentCoord);
        console.log(this.exitCoord);
        this.form.get('areaId').setValue(this.data.areaId);
        this.form.get('name').setValue(this.data.exit);
        this.form.get('coordX').setValue(this.exitCoord.x);
        this.form.get('coordY').setValue(this.exitCoord.y);
        this.form.get('coordZ').setValue(this.exitCoord.z);

    }


    addExit() {

        this.toastr.success(`Exit added successfully.`);

        this.dialogRef.close(this.exitService.returnExitObj());

    }


}

