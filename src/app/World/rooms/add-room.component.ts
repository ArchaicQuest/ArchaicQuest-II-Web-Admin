import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { RoomService } from './add-room.service';
import { ActivatedRoute } from '@angular/router';
import { MatSelectChange, MatDialogRef, MatDialog } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    take,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Item } from 'src/app/items/interfaces/item.interface';
import { ManageContainerItemsComponent } from './manage-container-items/manage-container-items.component';
import { ItemModule } from 'src/app/items/item.module';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';

@Component({
    templateUrl: './add-room.component.html'
})
export class AddRoomComponent implements OnInit {
    addRoomForm: FormGroup;
    id: number;
    coords: Coords;
    items: Item[] = [];
    mobs: Mob[] = [];
    constructor(
        private roomServices: RoomService,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        public dialog: MatDialog

    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addRoomForm = this.roomServices.addRoomForm;

        this.id = this.route.snapshot.params['id'];
        this.coords = {
            x: this.route.snapshot.params['x'],
            y: this.route.snapshot.params['y'],
            z: this.route.snapshot.params['z'],
        };

        this.addRoomForm.get('CoordX').setValue(this.coords.x);
        this.addRoomForm.get('CoordY').setValue(this.coords.y);
        this.addRoomForm.get('CoordZ').setValue(this.coords.z);

    }

    triggerDescriptionResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    get getRoomObjectsControl(): FormArray {
        return this.addRoomForm.get('roomObjects') as FormArray;
    }

    addRoomObject() {
        this.getRoomObjectsControl.push(this.roomServices.initRoomObject());

        console.log(this.roomServices.addRoomForm.value);
    }

    removeRoomObject(i: number) {
        this.getRoomObjectsControl.removeAt(i);
    }

    addItem(item: Item) {
        this.items.push(JSON.parse(JSON.stringify(item)));
    }

    addMob(mob: Mob) {
      this.mobs.push(JSON.parse(JSON.stringify(mob)));
  }

    // closeDialog() {
    //     this.dialogRef.close('Pizza!');
    // }
    openDialog(item: Item, index: number): void {
        const dialogRef = this.dialog.open(ManageContainerItemsComponent, {
            width: '450px',
            data: {
                item: item,
                items: this.items,
                containerIndex: index--
            }
        });

        dialogRef.afterClosed().subscribe(result => {


        });
    }

    removeItemFromContainer(container: Item, item: Item) {
        const foundIndex = container.container.items.findIndex(x => x.id === item.id);
        container.container.items.splice(foundIndex, 1);
    }


    removeItemFromMob(inventory: Item[], item: Item) {
      const foundIndex = inventory.findIndex(x => x.id === item.id);
      inventory.splice(foundIndex, 1);
  }



    addRoom() { }


}

