import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/items/interfaces/item.interface';

@Component({
    templateUrl: './manage-container-items.component.html'
})
export class ManageContainerItemsComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManageContainerItemsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            item: Item,
            items: Item,
            containerIndex: number
        }) { }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }


    addItemToContainer(item: Item) {

        this.data.items[this.data.containerIndex].container.items.push(item);

    }


}

