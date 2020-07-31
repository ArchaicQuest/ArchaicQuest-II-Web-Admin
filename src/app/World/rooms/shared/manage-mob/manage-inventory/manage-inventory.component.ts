import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';

@Component({
    templateUrl: './manage-inventory.component.html'
})
export class ManageInventoryComponent extends DataListComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManageInventoryComponent>,
        public helpers: Shared,
        @Inject(MAT_DIALOG_DATA) public data: {
            item: Mob,
            items: Item[],
            containerIndex: number
        }) { super(); }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

        this.filteredata = this.data.item.inventory || [];

    }

    removeItem(array: Item[], index: number) {
        this.helpers.removeItem(array, index);
        this.filteredata = [...array]
    }

    addItemToInventory(item: Item) {
        console.log("i", item)
        console.log("ic", this.filteredata)

        this.data.item.inventory.push(item);

        // this.filteredata.push(item);

    }


}

