import { Component, OnInit, ViewChild, NgZone, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CodeModel } from '@ngstack/code-editor';
import { Item } from 'src/app/items/interfaces/item.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';

@Component({
    templateUrl: './edit-object-json.component.html',
    styles: [`::ng-deep .ngs-code-editor {height:700px}`]
})
export class EditObjectJsonComponent extends DataListComponent implements OnInit {
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


    constructor(
        public dialogRef: MatDialogRef<EditObjectJsonComponent>,
        public helpers: Shared,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: {
            item: Item,
        }) { super(); }

    onClose(): void {
        this.dialogRef.close(this.itemModel.value);
    }

    ngOnInit() {
        this.itemModel.value = JSON.stringify(this.data.item, null, 4)


    }

    onCodeChanged(value) {

        this.data.item = value;
        this.itemModel.value = value;
        this.cd.detectChanges()



    }


    // addItemToContainer(item: Item) {
    //     // console.log('i', item);
    //     // console.log('ic', this.filteredata);

    //     this.data.item.container.items.push(item);

    //     const updatedModel = {
    //         language: 'json',
    //         uri: 'json.json',
    //         value: ''
    //     };


    //     this.itemModel = updatedModel;
    //     this.itemModel.value = JSON.stringify(this.data.item, null, 4)

    //     this.cd.detectChanges();


    // }


}

