import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemSlotEnum } from 'src/app/items/interfaces/item-slot.enum';
import { Item } from 'src/app/items/interfaces/item.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';
import { ManageContainerComponent } from '../../manage-container/manage-container.component';
import { ManageRoomItemsComponent } from '../add/manage-room-items.component';


@Component({
    selector: 'app-item-list',
    templateUrl: './room-item-list.component.html',
    styleUrls: ['./room-item-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])]
})
export class RoomItemListComponent extends DataListComponent implements OnInit, OnChanges {
    @Input() data: Item[];
    @Input() container: Item | Item[];
    @Input() isInventory: Boolean;
    @Input() disableContainerItems: Boolean = false;

    items: Item[] = [];

    dataSource = this.data || this.items;
    constructor(public dialog: MatDialog, public helpers: Shared) { super(); }


    ngOnInit() {
        console.log('items', this.data || this.items);
    }

    ngOnChanges() {
        this.filteredata = this.data;
    }


    addItem(item: Item) {
        console.log('item', item);
        const temp = this.dataSource.slice();
        temp.push(JSON.parse(JSON.stringify(item)));
        console.log(temp);
        this.data = temp;
        this.filteredata = this.data;
    }


    openDialog(): void {
        //   debugger;
        const dialogRef = this.dialog.open(ManageRoomItemsComponent, {
            width: '450px',
            data: {
                container: this.container,
                isInventory: this.isInventory
            }
        });

        dialogRef.afterClosed().subscribe(result => {


        });
    }


    openContainerDialog(item: Item, container: Item, index: number): void {
        const dialogRef = this.dialog.open(ManageContainerComponent, {
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



}

