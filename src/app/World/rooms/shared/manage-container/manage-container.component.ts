import { Component, OnInit, ViewChild, NgZone, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/items/interfaces/item.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';

@Component({
    templateUrl: './manage-container.component.html'
})
export class ManageContainerComponent extends DataListComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManageContainerComponent>,
        public helpers: Shared,
        @Inject(MAT_DIALOG_DATA) public data: {
            item: Item,
            items: Item[],
            containerIndex: number
        }) { super(); }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

        this.filteredata = this.data.item.container.items || [];

    }

    removeItem(array: Item[], index: number) {
        this.helpers.removeItem(array, index);
        this.filteredata = [...array]
    }

    addItemToContainer(item: Item) {
        console.log("i", item)
        console.log("ic", this.filteredata)

        this.data.item.container.items.push(item);

        // this.filteredata.push(item);

    }


}

