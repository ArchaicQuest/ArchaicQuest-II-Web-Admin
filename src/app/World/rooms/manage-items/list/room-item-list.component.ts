import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Item } from 'src/app/items/interfaces/item.interface';
import { MatDialog } from '@angular/material';
import { ManageContainerItemsComponent } from '../../manage-container-items/manage-container-items.component';
import { ItemSlotEnum } from 'src/app/items/interfaces/item-slot.enum';
import { ItemSelectorComponent } from 'src/app/items/selectors/Item-selector/item-selector.component';
import { ManageRoomItemsComponent } from '../add/manage-room-items.component';
import { container } from '@angular/core/src/render3';
import { removeItem, Helpers } from 'src/app/shared/helpers/helpers';


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
export class RoomItemListComponent implements OnInit, OnChanges {
    @Input() data: Item[];
    @Input() container: Item;

    items: Item[] = [];

    //move
    dataSource = this.data;
    columnsToDisplay = ['name', 'slot', 'level', 'questItem', 'container', 'actions'];
    expandedElement: Item | null;
    constructor(public dialog: MatDialog, public helpers: Helpers) { }


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
        const dialogRef = this.dialog.open(ManageRoomItemsComponent, {
            width: '450px',
            data: {
                container: this.container
            }
        });

        dialogRef.afterClosed().subscribe(result => {


        });
    }


    removeItem(array: Item[], index: number) {
      debugger;
      this.helpers.removeItem(array, index);
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

