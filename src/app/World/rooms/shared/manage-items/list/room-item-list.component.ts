import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Item } from 'src/app/items/interfaces/item.interface';
import { MatDialog } from '@angular/material';
import { ItemSlotEnum } from 'src/app/items/interfaces/item-slot.enum';
import { ItemSelectorComponent } from 'src/app/items/selectors/Item-selector/item-selector.component';
import { ManageRoomItemsComponent } from '../add/manage-room-items.component';
import { container } from '@angular/core/src/render3';
import { Shared } from 'src/app/shared/shared';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { ManageContainerItemsComponent } from '../../manage-container-items/manage-container-items.component';
import { ManageContainerComponent } from '../../manage-container/manage-container.component';


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
        console.log("items", this.data || this.items)

    }

    ngOnChanges() {
        this.filteredata = this.data;
    }


    addItem(item: Item) {
        console.log("item", item)
        let temp = this.dataSource.slice();
        temp.push(JSON.parse(JSON.stringify(item)));
        console.log(temp)
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

        console.log("remove", array)
        this.filteredata = [...array]
    }


    mapSlot(id: number) {
        return ItemSlotEnum[+id];
    }


    ngAfterViewInit() {
        this.filteredata = this.data;

    }

    t() {
        console.log("t");
    }



}

