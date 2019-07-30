import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { RoomService } from '../add-room/add-room.service';
import { ActivatedRoute } from '@angular/router';
import {
    MatSelectChange,
    MatDialogRef,
    MatDialog,
    MatTableDataSource
} from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Item } from 'src/app/items/interfaces/item.interface';
import { ManageContainerItemsComponent } from '../shared/manage-container-items/manage-container-items.component';
import { ItemModule } from 'src/app/items/item.module';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import { ItemSlotEnum } from 'src/app/items/interfaces/item-slot.enum';
import { Exit } from './../interfaces/exit.interface';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { RoomExit } from './../interfaces/roomExit.interface';
import { Room } from './../interfaces/room.interface';
import { RoomObject } from './../interfaces/roomObject.interface';
import { Shared } from 'src/app/shared/shared';
import { ManageMobComponent } from '../shared/manage-mob/manage-mob.component';
import { ManageExitsComponent } from '../shared/room-exits/manage-exits.component';
import { EditService } from '../../area/edit-area/edit-area.service';
import { EditRoomService } from './edit-room.service';

@Component({
    templateUrl: './edit-room.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
        ])
    ]
})
export class EditRoomComponent implements OnInit, OnDestroy {
    componentActive = true;
    addRoomForm: FormGroup;
    id: number;
    areaId: number;
    roomId: number;
    coords: Coords;
    items: Item[] = [];
    mobs: Mob[] = [];
    exits: RoomExit = {
        north: null,
        down: null,
        east: null,
        northEast: null,
        northWest: null,
        south: null,
        southEast: null,
        southWest: null,
        up: null,
        west: null
    };

    //move
    // dataSource = this.items;
    columnsToDisplay = [
        'name',
        'slot',
        'level',
        'questItem',
        'container',
        'actions'
    ];
    expandedElement: Item | null;
    mobColumnsToDisplay = ['name', 'level', 'actions'];
    mobExpandedElement: Mob | null;
    constructor(
        private roomServices: RoomService,
        private editRoomService: EditRoomService,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public shared: Shared,
        private cdRef: ChangeDetectorRef,
    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addRoomForm = this.roomServices.addRoomForm;
        console.log(this.route.snapshot.params)
        this.id = this.route.snapshot.params['id'];
        this.roomId = this.route.snapshot.params['id'];
        this.areaId = -1;
        this.coords = {
            x: this.route.snapshot.params['x'],
            y: this.route.snapshot.params['y'],
            z: this.route.snapshot.params['z']
        };

        this.addRoomForm.get('CoordX').setValue(this.coords.x);
        this.addRoomForm.get('CoordY').setValue(this.coords.y);
        this.addRoomForm.get('CoordZ').setValue(this.coords.z);

        this.roomServices.items.subscribe((value: Item[]) => {
            this.items = value;
        });

        this.roomServices.mobs.subscribe((value: Mob[]) => {
            this.mobs = value;
        });

        this.editRoomService.getRoom(this.roomId).subscribe((value: Room) => {
            this.exits = value.exits;
            this.mobs = value.mobs;
            this.items = value.items;
            this.areaId = value.areaId;
            this.addRoomForm.get('title').setValue(value.title);
            this.addRoomForm.get('description').setValue(value.description);

            this.coords = {
                x: value.coords.x,
                y: value.coords.y,
                z: value.coords.z,
            };

            this.addRoomForm.get('CoordX').setValue(value.coords.x);
            this.addRoomForm.get('CoordY').setValue(value.coords.y);
            this.addRoomForm.get('CoordZ').setValue(value.coords.z);

            if (value.exits.north) {
                this.addRoomForm.get('exits.north').setValue(value.exits.north);
            }
            if (value.exits.northWest) {
                this.addRoomForm.get('exits.northEast').setValue(value.exits.northWest);
            }
            if (value.exits.east) {
                this.addRoomForm.get('exits.east').setValue(value.exits.east);
            }
            if (value.exits.southEast) {
                this.addRoomForm.get('exits.southEast').setValue(value.exits.southEast);
            }
            if (value.exits.south) {
                this.addRoomForm.get('exits.south').setValue(value.exits.south);
            }
            if (value.exits.southWest) {
                this.addRoomForm.get('exits.southWest').setValue(value.exits.southWest);
            }
            if (value.exits.west) {
                this.addRoomForm.get('exits.west').setValue(value.exits.west);
            }
            if (value.exits.northWest) {
                this.addRoomForm.get('exits.northWest').setValue(value.exits.northWest);
            }
            if (value.exits.up) {
                this.addRoomForm.get('exits.up').setValue(value.exits.up);
            }
            if (value.exits.down) {
                this.addRoomForm.get('exits.down').setValue(value.exits.down);
            }

            if (value.roomObjects.length) {

                for (let index = 0; index < value.roomObjects.length - 1; index++) {
                    this.addRoomObject();

                }

                (<FormArray>this.addRoomForm.controls['roomObjects']).setValue(value.roomObjects);
            }

        });
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

    addMob(mob: Mob) {
        this.mobs.push(JSON.parse(JSON.stringify(mob)));
    }

    openDialog(item: Item, index: number): void {
        const dialogRef = this.dialog.open(ManageContainerItemsComponent, {
            width: '450px',
            data: {
                item: item,
                items: this.mobs,
                containerIndex: index--
            }
        });

        dialogRef.afterClosed().subscribe(result => { });
    }

    removeItemFromContainer(container: Item, item: Item) {
        const foundIndex = container.container.items.findIndex(
            x => x.id === item.id
        );
        container.container.items.splice(foundIndex, 1);
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
    }

    openMobDialog(mob: Mob): void {
        const dialogRef = this.dialog.open(ManageMobComponent, {
            width: '450px',
            data: {
                inventory: mob.inventory
            }
        });

        dialogRef.afterClosed().subscribe(result => { });
    }

    removeItemFromMob(inventory: Item[], item: Item) {
        const foundIndex = inventory.findIndex(x => x.id === item.id);
        inventory.splice(foundIndex, 1);
    }

    removeMob(index: number) {
        this.mobs.splice(index, 1);
    }

    openExitDialog(exitDirection: string): void {
        const dialogRef = this.dialog.open(ManageExitsComponent, {
            width: '450px',
            data: { exit: exitDirection, currentCoord: this.coords, areaId: this.areaId }
        });

        dialogRef.afterClosed().subscribe((result: Exit) => {

            if (result == null) {
                return;
            }

            switch (result.name) {
                case 'North':
                    this.exits.north = result;
                    this.addRoomForm.get('exits.north').setValue(result);
                    break;
                case 'North East':
                    this.exits.northEast = result;
                    this.addRoomForm.get('exits.northEast').setValue(result);
                    break;
                case 'East':
                    this.exits.east = result;
                    this.addRoomForm.get('exits.east').setValue(result);
                    break;
                case 'South East':
                    this.exits.southEast = result;
                    this.addRoomForm.get('exits.southEast').setValue(result);
                    break;
                case 'South':
                    this.exits.south = result;
                    this.addRoomForm.get('exits.south').setValue(result);
                    break;
                case 'South West':
                    this.exits.southWest = result;
                    this.addRoomForm.get('exits.southWest').setValue(result);
                    break;
                case 'West':
                    this.exits.west = result;
                    this.addRoomForm.get('exits.west').setValue(result);
                    break;
                case 'North West':
                    this.exits.northWest = result;
                    this.addRoomForm.get('exits.northWest').setValue(result);
                    break;
                case 'Up':
                    this.exits.up = result;
                    this.addRoomForm.get('exits.up').setValue(result);
                    break;
                case 'Down':
                    this.exits.down = result;
                    this.addRoomForm.get('exits.down').setValue(result);
                    break;
            }


            console.log('exit ', this.exits);
            console.log(result);
        });
    }

    mapSlot(id: number) {
        return ItemSlotEnum[id];
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        //this.dataSource = this.items;
        // If the user changes the sort order, reset back to the first page.
        //  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    t() {
        console.log('t');
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.roomServices.clearCache();
    }

    saveRoom() {

        //TODO
        /*
        Create room object interface, loop over this.getRoomObjectsControl
        can then push data to room object array

        return Exits and save

        Missing room emotes
         - you hear a deathly scream in the distance

        missing Instant repop and Update message (Generic message for when room repops)

        WTF is Players?
        */


        const data: Room = {
            roomObjects: [],
            areaId: this.id,
            coords: {
                x: this.addRoomForm.get('CoordX').value,
                y: this.addRoomForm.get('CoordY').value,
                z: this.addRoomForm.get('CoordZ').value
            },
            description: this.addRoomForm.get('description').value,
            title: this.addRoomForm.get('title').value,
            items: this.items,
            mobs: this.mobs,
            emotes: [],
            exits: {
                north: this.addRoomForm.get('exits.north').value,
                northEast: this.addRoomForm.get('exits.northEast').value,
                east: this.addRoomForm.get('exits.east').value,
                southEast: this.addRoomForm.get('exits.southEast').value,
                south: this.addRoomForm.get('exits.south').value,
                southWest: this.addRoomForm.get('exits.southWest').value,
                west: this.addRoomForm.get('exits.west').value,
                northWest: this.addRoomForm.get('exits.northWest').value,
                up: this.addRoomForm.get('exits.up').value,
                down: this.addRoomForm.get('exits.down').value,
            },
            instantRepop: false,
            players: null,
            updateMessage: 'nothing'
        };

        this.getRoomObjectsControl.value.forEach((roomObj: RoomObject) => {
            data.roomObjects.push(roomObj);
        });




        this.roomServices.saveRoom(data);
    }
}
