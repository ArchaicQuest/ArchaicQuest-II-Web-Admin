import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Area, RoomTable } from '../interface/area.interface';
import { ViewAreaService } from './view-area.service';
import { ActivatedRoute } from '@angular/router';
import { EditService } from '../edit-area/edit-area.service';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Room } from '../../rooms/interfaces/room.interface';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    templateUrl: './view-area.component.html',
    styleUrls: ['./view-area.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewAreaComponent extends DataListComponent implements OnInit {
    area: Area;
    roomTable: RoomTable = {};
    roomCount: 5;
    maxValueOfX: number;
    maxValueOfY: number;
    minValueOfX: number;
    minValueOfY: number;
    totalCol: number;
    totalRow: number;
    rooms: Room[] = [];
    errors: string[] = [];
    downloadJsonHref: SafeUrl;
    exporting: boolean;
    displayedColumns: string[] = ['id', 'name', 'coords'];
    zaxis: number = 0;

    constructor(
        private service: ViewAreaService,
        private editAreaServices: EditService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private toastr: ToastrService,
        private sanitizer: DomSanitizer,
        private toast: ToastrService,
        public helpers: Shared) {
        super();
    }

    ngOnInit() {

        this.editAreaServices.getArea(this.route.snapshot.params['id']).subscribe(data => {

            //  this.exportRoom(JSON.stringify(data));

            const startingCoords: Coords = {
                x: 0,
                y: 0,
                z: this.zaxis
            };

            const startingRoom: Room = {
                coords: startingCoords,
                title: 'add room',
                roomObjects: null,
                description: '',
                exits: null,
                emotes: null,
                items: null,
                players: null,
                mobs: null,
                instantRepop: false,
                updateMessage: '',
                type: 0,
                terrain: 0,
                roomFlags: []
            };



            if (data.rooms.length == 0) {
                this.rooms.push(startingRoom);
            } else {

                this.rooms = data.rooms;
                this.data = this.rooms;
                this.filteredata = this.rooms;


                data.rooms.forEach(room => {
                    this.roomTable[this.service.getRoomID(room.coords)] = room;
                });

            }

            this.area = {
                'id': data.id,
                'title': data.title,
                'description': data.description,
                'dateCreated': data.dateCreated,
                'dateUpdated': data.dateUpdated,
                'createdBy': data.createdBy,
                'modifiedBy': null,
                'rooms': this.rooms
            };

            this.maxValueOfX = Math.max(...this.rooms.map(room => room.coords.x), 0) + 1;
            this.maxValueOfY = Math.max(...this.rooms.map(room => room.coords.y), 0) + 1;

            this.minValueOfX = Math.min(...this.rooms.map(room => room.coords.x), 0) - 1;
            this.minValueOfY = Math.min(...this.rooms.map(room => room.coords.y), 0) - 1;


            this.totalRow = Math.abs(this.maxValueOfY) + Math.abs(this.minValueOfY) + 1;
            this.totalCol = Math.abs(this.maxValueOfX) + Math.abs(this.minValueOfX) + 1;

            var url = new URL(window.location.href);
            var toastMessage = url.searchParams.get("saved");
            
            if(toastMessage != null) {
                 this.toast.success(toastMessage);
            }

        });


    }

    increaseZaxis() {
        this.zaxis += 1;
    }
    decreaseZaxis() {
        this.zaxis -= 1;

        this.data = this.rooms;
        this.filteredata = this.rooms;


    }

    applyFilter(filterValue: string) {
        const result = this.data.filter((x:Room)=> x.title.toLowerCase().includes(filterValue));
        this.filteredata = result;
    }

    applyCoordsFilter(filterValue: string) {
        var coords = filterValue.split(",");
        if(coords.length <= 2) {
            return
        }

        var filterCords:Coords = {
            x:+coords[0],
            y:+coords[1],
            z:+coords[2]
        }
     
        const result = this.data.filter((x:Room) => x.coords.x == filterCords.x && x.coords.y == filterCords.y && x.coords.z == filterCords.z);
        this.filteredata = result;
    }

    removeItem(array: Room[], index: number, id: number) {
        this.service.deleteRoom(id).pipe(take(1)).subscribe((deleted: any) => {

            if (deleted) {
                this.helpers.removeItem(array, index);
                this.filteredata = [...array];

                this.toastr.success(deleted.toast);
            }
        });
    }


    isRoom(room: Coords) {

        return this.rooms.find(x => x.coords.x === room.x && x.coords.y === room.y && x.coords.z === room.z && x.title !== 'add room');
    }

    isTwoWayExit(room: Coords, exitDir: string) {
        return this.service.isTwoWayExit(this.roomTable, room, exitDir);
    }

    isValidExit(room: Coords, exitDir: string) {

        const validExit = this.service.HasValidExit(this.roomTable, room, exitDir);

        return validExit;
    }

    hasNorthExit(currentRoom: Coords) {

        return this.isRoom(currentRoom) && this.service.hasNorthExit(this.roomTable, currentRoom);
    }
    hasNorthEastExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasNorthEastExit(this.roomTable, currentRoom);
    }
    hasEastExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasEastExit(this.roomTable, currentRoom);
    }
    hasSouthEastExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasSouthEastExit(this.roomTable, currentRoom);
    }
    hasSouthExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasSouthExit(this.roomTable, currentRoom);
    }
    hasSouthWestExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasSouthWestExit(this.roomTable, currentRoom);
    }
    hasWestExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasWestExit(this.roomTable, currentRoom);
    }
    hasNorthWestExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasNorthWestExit(this.roomTable, currentRoom);
    }

    setRoomClass(coord: Coords, exitDirection: string): string {

        let exitClass = '';

        exitClass += this.isValidExit(coord, exitDirection) ? ' exit--valid ' : ' exit--invalid ';
        exitClass += this.isTwoWayExit(coord, exitDirection) ? ` exit--${exitDirection}--twoWay ` : ` exit--${exitDirection}--oneWay `;

        return exitClass;
    }

    download(blob, filename) {
        this.exporting = true;
        if (window.navigator.msSaveOrOpenBlob) { // IE10+
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else { // Others
            const a = document.createElement('a'),
                url = URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

            }, 0);

            // random number
            setTimeout(() => {
                this.exporting = false;
            }, 1500);
        }
    }

    exportRoom() {

        const file = new Blob([JSON.stringify(this.area)], { type: 'text/json' });
        this.download(file, `${this.area.title}.json`);
    }

    //  this.GenerateRoomLayout();

}




