import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Item } from 'src/app/items/interfaces/item.interface';
import { RoomService } from '../../../add-room/add-room.service';
import { ToastrService } from 'ngx-toastr';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';

@Component({
    templateUrl: './manage-room-mobs.component.html'
})
export class ManageRoomMobsComponent implements OnInit {

    constructor(
        public roomServices: RoomService,
        public dialogRef: MatDialogRef<ManageRoomMobsComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {
            mob: Mob,
            // containerIndex: number
        }) { }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }


    addMobToRoom(data: Mob) {
        debugger;
        this.roomServices.roomMobs(data);

        this.toastr.success(`${data.name} added successfully.`);

        this.dialogRef.close();

    }


}

