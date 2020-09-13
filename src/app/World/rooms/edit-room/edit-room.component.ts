import {
    Component,
    OnInit,
    ViewChild,
    NgZone,
    OnDestroy,
    ChangeDetectorRef
} from "@angular/core";
import {
    FormGroup,
    FormArray
} from "@angular/forms";
import { RoomService } from "../add-room/add-room.service";
import { ActivatedRoute } from "@angular/router";
import {
    MatDialog
} from "@angular/material/dialog";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";

import { Coords } from "src/app/shared/interfaces/coords.interface";
import { Item } from "src/app/items/interfaces/item.interface";
import { ManageContainerItemsComponent } from "../shared/manage-container-items/manage-container-items.component";
import { Mob } from "src/app/mobs/interfaces/mob.interface";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import { ItemSlotEnum } from "src/app/items/interfaces/item-slot.enum";
import { RoomExit } from "./../interfaces/roomExit.interface";
import { Room, RoomTypes } from "./../interfaces/room.interface";
import { RoomObject } from "./../interfaces/roomObject.interface";
import { Shared } from "src/app/shared/shared";
import { ManageMobComponent } from "../shared/manage-mob/manage-mob.component";
import { EditRoomService } from "./edit-room.service";

@Component({
    templateUrl: "./edit-room.component.html",
    styleUrls: ["../add-room/add-room.component.scss"],
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

    northWestValid: false;

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
    northWestValidExit = false;
    northValidExit = false;
    northEastValidExit = false;
    eastValidExit = false;
    southEastValidExit = false;
    southValidExit = false;
    southWestValidExit = false;
    westValidExit = false;
    RoomTypes: { name: string; value: number }[];

    constructor(
        private roomServices: RoomService,
        private editRoomService: EditRoomService,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public shared: Shared) { }

    @ViewChild("autosize") autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addRoomForm = this.roomServices.addRoomForm;

        console.log(this.roomServices.addRoomForm)
        console.log(this.route.snapshot.params);
        this.id = this.route.snapshot.params["id"];
        this.roomId = this.route.snapshot.params["roomId"];

        this.roomServices.items.subscribe((value: Item[]) => {
            this.items = value;
        });

        this.roomServices.mobs.subscribe((value: Mob[]) => {
            this.mobs = value;
        });

        this.editRoomService.getRoom(this.roomId).subscribe((value: Room) => {
            this.mobs = value.mobs;
            this.items = value.items;
            this.areaId = value.areaId;
            this.exits = value.exits;
            this.addRoomForm.get("title").setValue(value.title);
            this.addRoomForm.get("description").setValue(value.description);

            value.items.forEach(item => {
                this.roomServices.roomItems(item);
            });

            this.coords = {
                x: value.coords.x,
                y: value.coords.y,
                z: value.coords.z
            };

            this.RoomTypes = Object.keys(RoomTypes)
                .filter(value => isNaN(Number(value)) === false)
                .map((key, index) => {

                    console.log("rm type", index === 0 ? 0 : 1 << index)
                    return { name: RoomTypes[key], value: index === 0 ? 0 : 1 << index };
                });


            if (value.roomObjects.length) {
                //this is a hack to remove the first object section as
                // it's added by this.roomServices.addRoomForm;
                // so what happens is you have a blank object
                // followed by the other objects with data
                // so just removed the first instance, quickest solution
                this.getRoomObjectsControl.removeAt(0);
                for (let index = 0; index < value.roomObjects.length; index++) {
                    this.addRoomObject(value.roomObjects[index]);
                }

            }

            if (value.emotes.length) {
                //this is a hack to remove the first object section as
                // it's added by this.roomServices.addRoomForm;
                // so what happens is you have a blank object
                // followed by the other objects with data
                // so just removed the first instance, quickest solution
                this.getEmotesControl.removeAt(0);
                for (let index = 0; index < value.emotes.length; index++) {
                    this.addEmote(value.emotes[index]);
                }

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
        return this.addRoomForm.get("roomObjects") as FormArray;
    }

    addRoomObject(roomObj: RoomObject) {

        this.getRoomObjectsControl.push(this.roomServices.initRoomObject(roomObj));

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

        dialogRef.afterClosed().subscribe(() => { });
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

        dialogRef.afterClosed().subscribe(() => { });
    }

    removeItemFromMob(inventory: Item[], item: Item) {
        const foundIndex = inventory.findIndex(x => x.id === item.id);
        inventory.splice(foundIndex, 1);
    }

    removeMob(index: number) {
        this.mobs.splice(index, 1);
    }

    mapSlot(id: number) {
        return ItemSlotEnum[id];
    }

    onExitValueChange(newValue) {
        this.exits = newValue;
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.roomServices.clearCache();
        this.exits = {
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
    }

    get getEmotesControl(): FormArray {
        return this.addRoomForm.get('emotes') as FormArray;
    }

    addEmote(data: string) {
        this.getEmotesControl.push(this.roomServices.initEmote(data));
    }

    removeLink(i: number) {
        this.getEmotesControl.removeAt(i);
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
            id: this.roomId,
            roomObjects: [],
            areaId: this.areaId,
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

        this.getEmotesControl.value.forEach((emote: { emote: string }) => {
            data.emotes.push(emote.emote);
        });


        this.roomServices.updateRoom(data);
    }
}
