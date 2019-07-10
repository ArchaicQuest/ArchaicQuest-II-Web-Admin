import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Mob } from '../add-room/node_modules/src/app/mobs/interfaces/mob.interface';

@Component({
    templateUrl: './manage-mob.component.html'
})
export class ManageMobComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManageMobComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            mobs: Mob[],
        }) { }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }


    addMobToRoom(mob: Mob) {
        this.data.mobs.push(mob);

    }


}

