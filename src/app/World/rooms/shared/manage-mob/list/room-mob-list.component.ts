import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Item } from 'src/app/items/interfaces/item.interface';
import { MatDialog } from '@angular/material/dialog';
import { ItemSlotEnum } from 'src/app/items/interfaces/item-slot.enum';
import { ManageRoomMobsComponent } from '../add/manage-room-mobs.component';
import { Shared } from 'src/app/shared/shared';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { ManageContainerComponent } from '../../manage-container/manage-container.component';
import { ManageInventoryComponent } from '../manage-inventory/manage-inventory.component';


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
export class RoomMobListComponent extends DataListComponent implements OnInit, OnChanges {
    @Input() data: Mob[];

    // move
    dataSource = this.data;
    constructor(public dialog: MatDialog, public helpers: Shared) { super(); }


    ngOnInit() {
        console.log(this.data);
    }

    ngOnChanges() {
        this.filteredata = this.data;
    }


    addItem(item: Item) {

        item.slot = this.mapSlot(item.slot);
        const temp = this.dataSource.slice();
        temp.push(JSON.parse(JSON.stringify(item)));
        this.dataSource = temp;
        this.data = temp;
        this.filteredata = this.data;
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
        this.filteredata = [...array];
    }


    mapSlot(id: number) {
        return ItemSlotEnum[+id];
    }


    ngAfterViewInit() {
        this.filteredata = this.data;

    }


    openInventoryDialog(item: Item, container: Item, index: number): void {
        const dialogRef = this.dialog.open(ManageInventoryComponent, {
            height: '65%',
            width: '50%',
            data: {
                item: item,
                items: container,
                containerIndex: index--
            }
        });

        dialogRef.afterClosed().subscribe(result => { });
    }



}

