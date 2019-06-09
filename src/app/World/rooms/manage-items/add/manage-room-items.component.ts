import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Item } from 'src/app/items/interfaces/item.interface';
import { RoomService } from '../../add-room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './manage-room-items.component.html'
})
export class ManageRoomItemsComponent implements OnInit {

    constructor(
        public roomServices: RoomService,
        public dialogRef: MatDialogRef<ManageRoomItemsComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: {
            item: Item,
            container: Item,
            // containerIndex: number
        }) { }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    addItemToContainer(item: Item, container: Item) {
        console.log(item)

        container.container.items.push(item);

        this.roomServices.roomItemsUpdate(container);

        this.toastr.success(`${item.name} added successfully to ${container.name}.`);

        this.dialogRef.close();

    }

    addItemToRoom(item: Item) {
        console.log(item)

        // debugger;

        if (this.data.container != null && this.data.container.itemType == '2') {

            this.addItemToContainer(item, this.data.container);
        }

        this.roomServices.roomItems(item);

        this.toastr.success(`${item.name} added successfully.`);

        this.dialogRef.close();

    }


}

