import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ItemSlotEnum } from 'src/app/items/interfaces/item-slot.enum';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Shared } from 'src/app/shared/shared';
import { Room, RoomTypes } from '../interfaces/room.interface';
import { RoomExit } from '../interfaces/roomExit.interface';
import { RoomObject } from '../interfaces/roomObject.interface';
import { ManageContainerItemsComponent } from '../shared/manage-container-items/manage-container-items.component';
import { ManageMobComponent } from '../shared/manage-mob/manage-mob.component';
import { RoomExitService } from '../shared/room-exits/manage-exits.service';
import { RoomService } from './add-room.service';



@Component({
    templateUrl: "./add-room.component.html",
    styleUrls: ["./add-room.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
            )
        ])
    ]
})
export class AddRoomComponent implements OnInit, OnDestroy {
    componentActive = true;
    addRoomForm: FormGroup;
    id: number;
    areaId: number;
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

    northWestValidExit = false;
    northValidExit = false;
    northEastValidExit = false;
    eastValidExit = false;
    southEastValidExit = false;
    southValidExit = false;
    southWestValidExit = false;
    westValidExit = false;
    RoomTypes: { name: string; value: number }[];

    //move
    // dataSource = this.items;
    columnsToDisplay = [
        "name",
        "slot",
        "level",
        "questItem",
        "container",
        "actions"
    ];
    expandedElement: Item | null;
    mobColumnsToDisplay = ["name", "level", "actions"];
    mobExpandedElement: Mob | null;
    constructor(
        private roomServices: RoomService,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public shared: Shared,
        private cdRef: ChangeDetectorRef,
        private exitService: RoomExitService
    ) { }

    @ViewChild("autosize") autosize: CdkTextareaAutosize;


    ngOnInit() {
        this.addRoomForm = this.roomServices.addRoomForm;

        this.id = this.route.snapshot.params["id"];
        this.areaId = this.route.snapshot.params["area"];

        this.roomServices.items.subscribe((value: Item[]) => {
            console.log(value);
            this.items = value;
        });

        this.roomServices.mobs.subscribe((value: Mob[]) => {
            console.log(value);
            this.mobs = value;
        });

        this.RoomTypes = Object.keys(RoomTypes)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: RoomTypes[key], value: index === 0 ? 0 : 1 << index };
            });


    }

    onExitValueChange(newValue) {
        this.exits = newValue;
    }

    triggerDescriptionResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    get getRoomObjectsControl(): FormArray {
        return this.addRoomForm.get("roomObjects") as FormArray;
    }

    addRoomObject() {
        this.getRoomObjectsControl.push(this.roomServices.initRoomObject(null));

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
            width: "450px",
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
            width: "450px",
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

    isExitValid(direction: string): string {
        console.log(this.coords)
        const coords = this.exitService.setExitCoord(direction, this.coords);
        this.roomServices.isValidExit(coords.x, coords.y, coords.z, this.id).subscribe({
            next: x => {
                return x;
            }
        });

        return 'false';
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
        console.log("t");
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
                x: this.addRoomForm.get("CoordX").value,
                y: this.addRoomForm.get("CoordY").value,
                z: this.addRoomForm.get("CoordZ").value
            },
            description: this.addRoomForm.get("description").value,
            title: this.addRoomForm.get("title").value,
            items: this.items,
            mobs: this.mobs,
            emotes: [],
            exits: {
                north: this.addRoomForm.get("exits.north").value,
                northEast: this.addRoomForm.get("exits.northEast").value,
                east: this.addRoomForm.get("exits.east").value,
                southEast: this.addRoomForm.get("exits.southEast").value,
                south: this.addRoomForm.get("exits.south").value,
                southWest: this.addRoomForm.get("exits.southWest").value,
                west: this.addRoomForm.get("exits.west").value,
                northWest: this.addRoomForm.get("exits.northWest").value,
                up: this.addRoomForm.get("exits.up").value,
                down: this.addRoomForm.get("exits.down").value
            },
            instantRepop: false,
            players: null,
            updateMessage: "nothing",
            type: this.addRoomForm.get("type").value
        };

        this.getRoomObjectsControl.value.forEach((roomObj: RoomObject) => {
            data.roomObjects.push(roomObj);
        });

        this.roomServices.saveRoom(data);
    }
}
