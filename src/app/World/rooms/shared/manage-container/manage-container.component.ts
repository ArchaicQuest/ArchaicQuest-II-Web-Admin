import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/items/interfaces/item.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';

@Component({
    templateUrl: './manage-container.component.html'
})
export class ManageContainerComponent extends DataListComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManageContainerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            item: Item,
            items: Item[],
            containerIndex: number
        }) { super(); }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

        this.filteredata = this.data.item.containerItems || [];

    }


    addItemToContainer(item: Item) {
        console.log("i", item)
        console.log("ic", this.filteredata)

        this.filteredata.push(item);

    }


}

