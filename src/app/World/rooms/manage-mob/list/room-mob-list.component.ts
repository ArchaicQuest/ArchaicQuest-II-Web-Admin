import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Item } from 'src/app/items/interfaces/item.interface';
import { MatDialog } from '@angular/material';
import { ItemSlotEnum } from 'src/app/items/interfaces/item-slot.enum';
import { ManageRoomMobsComponent } from '../add/manage-room-mobs.component';
import { Shared } from 'src/app/shared/shared';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';


@Component({
    selector: 'app-mob-list',
    templateUrl: './room-mob-list.component.html',
    styleUrls: ['./room-mob-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])]
})
export class RoomMobListComponent implements OnInit, OnChanges {
    @Input() data: Mob[];

    //move
    dataSource = this.data;
    columnsToDisplay = ['name',   'level',  'actions'];
    expandedElement: Mob | null;
    constructor(public dialog: MatDialog, public helpers: Shared) { }


    ngOnInit() {
        console.log(this.data)
    }

    ngOnChanges() {
        this.dataSource = this.data;
    }


    addItem(item: Item) {

        item.slot = this.mapSlot(item.slot);
        let temp = this.dataSource.slice();
        temp.push(JSON.parse(JSON.stringify(item)));
        this.dataSource = temp;
    }


    openDialog(): void {
        //   debugger;
        const dialogRef = this.dialog.open(ManageRoomMobsComponent, {
            width: '450px',
        });

        dialogRef.afterClosed().subscribe(result => {


        });
    }


    removeItem(array: Item[], index: number) {
        this.helpers.removeItem(array, index);
        this.dataSource = JSON.parse(JSON.stringify(array));
    }


    mapSlot(id: number) {
        return ItemSlotEnum[+id];
    }


    ngAfterViewInit() {
        this.dataSource = this.data;

    }

    t() {
        console.log("t");
    }



}

