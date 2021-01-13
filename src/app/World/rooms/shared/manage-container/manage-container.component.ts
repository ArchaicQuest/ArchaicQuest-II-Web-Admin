import { Component, OnInit, ViewChild, NgZone, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CodeModel } from '@ngstack/code-editor';
import { Item } from 'src/app/items/interfaces/item.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';

@Component({
    templateUrl: './manage-container.component.html'
})
export class ManageContainerComponent extends DataListComponent implements OnInit {
    itemModel: CodeModel = {
        language: 'json',
        uri: 'json.json',
        value: '',
    };
    options = {
        contextmenu: true,
        minimap: {
            enabled: false,
        },
    };

    public itemobjForm = this.formBuilder.group({
        itemobj: [''],
    });
    constructor(
        public dialogRef: MatDialogRef<ManageContainerComponent>,
        public helpers: Shared,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
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

        //this.itemModel.value = JSON.stringify(this.data.item, null, 4);

        //this.itemobjForm.get('itemobj').setValue(JSON.stringify(this.data.item, null, 4));

    }

    onCodeChanged(value) {
        console.log("code change", value)

        this.itemModel.value = value;
        this.data.item = value;


    }

    removeItem(array: Item[], index: number) {
        this.helpers.removeItem(array, index);
        this.filteredata = [...array];


    }

    addItemToContainer(item: Item) {
        // console.log('i', item);
        // console.log('ic', this.filteredata);

        this.data.item.container.items.push(item);

        const updatedModel = {
            language: 'json',
            uri: 'json.json',
            value: ''
        };


        this.itemModel = updatedModel;
        this.itemModel.value = JSON.stringify(this.data.item, null, 4)

        this.cd.detectChanges();


    }


}

