import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Exit } from '../../interfaces/exit.interface';
import { RoomExitService } from './manage-exits.service';

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
            exitAreaId: number,
            areaId: number,
            obj: Exit
        }) {
        this.form = this.exitService.addExitForm;
    }



    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.exitDirection = this.data.exit;
        this.currentCoord = JSON.parse(JSON.stringify(this.data.currentCoord));

        console.log("This ", this.currentCoord)
        /*
            TODO: Override Exit safety checks
            still an issue here for maze rooms where we want exits to go in a nonsensical way
            maybe add a checkbox to the modal to override the safety checks so the user can enter
            any areaId and coordinates they wish
        */

        /* if area id matches then calculate the correct coords */
        if (this.data.exitAreaId === this.data.areaId) {
            this.exitCoord = this.exitService.setExitCoord(this.exitDirection, this.currentCoord);
        } else {
            this.exitCoord = this.data.currentCoord;
        }

        if (this.data.exitAreaId === this.data.areaId) {
            this.form.get('areaId').setValue(this.data.areaId);
        } else {
            this.form.get('areaId').setValue(this.data.exitAreaId);
        }
        console.log("setting y to ", this.exitCoord.y)
        this.form.get('name').setValue(this.data.exit);
        this.form.get('coordX').setValue(this.exitCoord.x);
        this.form.get('coordY').setValue(this.exitCoord.y);
        this.form.get('coordZ').setValue(this.exitCoord.z);
        this.form.get('door').setValue(this.data.obj.door);
        this.form.get('keyword').setValue(this.data.obj.keyword);
        this.form.get('closed').setValue(this.data.obj.closed);
        this.form.get('locked').setValue(this.data.obj.locked);
        this.form.get('pickProof').setValue(this.data.obj.pickProof);
        this.form.get('noPass').setValue(this.data.obj.noPass);
        this.form.get('noScan').setValue(this.data.obj.noScan);
        this.form.get('hidden').setValue(this.data.obj.hidden);
        this.form.get('lockId').setValue(this.data.obj.lockId);
    }


    addExit() {

        this.toastr.success(`Exit added successfully.`);

        this.dialogRef.close(this.exitService.returnExitObj());

    }

    removeExit() {

        this.toastr.success(`Exit removed successfully.`);

        this.dialogRef.close({ exit: this.exitDirection });

    }



}

