import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { RoomService } from '../../../add-room/add-room.service';

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
        //  debugger;
        this.roomServices.roomMobs(data);

        this.toastr.success(`${data.name} added successfully.`);

        this.dialogRef.close();

    }


}

