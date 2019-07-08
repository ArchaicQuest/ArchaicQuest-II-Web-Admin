import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Area, RoomTable } from '../interface/area.interface';
import { ViewAreaService } from './view-area.service';
import { ActivatedRoute } from '@angular/router';
import { EditService } from '../edit-area/edit-area.service';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Room } from '../../rooms/interfaces/room.interface';
import { debug } from 'util';

@Component({
    templateUrl: './view-area.component.html',
    styleUrls: ['./view-area.component.scss']
})
export class ViewAreaComponent implements OnInit {
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
    constructor(private service: ViewAreaService, private editAreaServices: EditService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {

    }

    ngOnInit() {



        this.editAreaServices.getArea(this.route.snapshot.params['id']).subscribe(data => {

            const startingCoords: Coords = {
                x: 0,
                y: 0,
                z: 0
            };

            let startingRoom: Room = {
                coords: startingCoords,
                title: 'add room',
                RoomObjects: null,
                description: '',
                exits: null,
                emotes: null,
                items: null,
                players: null,
                mobs: null,
                instantRepop: false,
                updateMessage: '',
            };



            if (data.rooms.length == 0) {
                this.rooms.push(startingRoom);
            } else {

                this.rooms = data.rooms;

                data.rooms.forEach(room => {
                    this.roomTable[this.service.getRoomID(room.coords)] = room;
                });


                console.log(this.roomTable["{x:0,y:1,z:0}"])
                console.log("-----------------------------------------------")
                console.log(this.roomTable["{x:1,y:1,z:0}"])
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

            console.log("mx x", this.maxValueOfX)
            console.log("mx y", this.maxValueOfY)

            console.log("mn x", this.minValueOfX)
            console.log("mn y", this.minValueOfY)

            this.totalRow = Math.abs(this.maxValueOfY) + Math.abs(this.minValueOfY) + 1;
            this.totalCol = Math.abs(this.maxValueOfX) + Math.abs(this.minValueOfX) + 1;

            console.log("totalRow", this.totalRow)
            console.log("totalCol", this.totalCol)

        });

        //  this.GenerateRoomLayout();
    }


    isRoom(room: Coords) {
        return this.rooms.find(x => x.coords.x === room.x && x.coords.y === room.y);
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
        return this.isRoom(currentRoom) && this.service.hasNorthEastExit(this.rooms, currentRoom);
    }
    hasEastExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasEastExit(this.roomTable, currentRoom);
    }
    hasSouthEastExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasSouthEastExit(this.roomTable, currentRoom);
    }
    hasSouthExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasSouthExit(this.rooms, currentRoom);
    }
    hasSouthWestExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasSouthWestExit(this.roomTable, currentRoom);
    }
    hasWestExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasWestExit(this.rooms, currentRoom);
    }
    hasNorthWestExit(currentRoom: Coords) {
        return this.isRoom(currentRoom) && this.service.hasNorthWestExit(this.rooms, currentRoom);
    }

    setRoomClass(coord: Coords, exitDirection: string): string {
        let exitClass = '';

        exitClass += this.isValidExit(coord, exitDirection) ? ' exit--valid ' : ' exit--invalid ';
        exitClass += this.isTwoWayExit(coord, exitDirection) ? ` exit--${exitDirection}--twoWay ` : ` exit--${exitDirection}--oneWay `;

        return exitClass;
    }




}
