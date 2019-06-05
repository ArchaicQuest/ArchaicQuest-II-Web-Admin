import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/items/interfaces/item.interface';

@Component({
    templateUrl: './manage-exits.component.html'
})
export class ManageExitsComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ManageExitsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            inventory: Item[],
        }) { }

    onClose(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }


    addItemToInventory(item: Item) {
        this.data.inventory.push(item);

    }


}

