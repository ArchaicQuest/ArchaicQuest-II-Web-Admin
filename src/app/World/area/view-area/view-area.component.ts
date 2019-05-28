import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Area } from '../interface/area.interface';
import { ViewAreaService } from './view-area.service';
import { ActivatedRoute } from '@angular/router';
import { EditService } from '../edit-area/edit-area.service';
import { Coords } from 'src/app/shared/interfaces/coords.interface';

@Component({
    templateUrl: './view-area.component.html',
    styleUrls: ['./view-area.component.scss']
})
export class ViewAreaComponent implements OnInit {
    area: Area;

    roomCount: 5;
    maxValueOfX: number;
    maxValueOfY: number;

    minValueOfX: number;
    minValueOfY: number;
    totalCol: number;
    totalRow: number;
    rooms: Coords[];
    constructor(private service: ViewAreaService, private editAreaServices: EditService, private route: ActivatedRoute) {

    }

    ngOnInit() {

        this.editAreaServices.getArea(this.route.snapshot.params['id']).subscribe(data => {

            this.area = {
                'id': data.id,
                'title': data.title,
                'description': data.description,
                'dateCreated': data.dateCreated,
                'dateUpdated': data.dateUpdated,
                'createdBy': data.createdBy,
                'modifiedBy': null,
                'rooms': data.rooms
            };
        });

        this.GenerateRoomLayout();
    }

    GenerateRoomLayout() {
        const startingCoords: Coords = {
            x: 0,
            y: 0,
            z: 0
        };

        const room1 = startingCoords;
        const north = {
            x: 0,
            y: 1,
            z: 0
        };
        const east = {
            x: 1,
            y: 0,
            z: 0
        };
        const east1 = {
            x: 2,
            y: 0,
            z: 0
        };
        const east2 = {
            x: 3,
            y: 0,
            z: 0
        };
        const south = {
            x: 0,
            y: -1,
            z: 0
        };
        const south2 = {
            x: 0,
            y: -2,
            z: 0
        };
        const west = {
            x: -1,
            y: 0,
            z: 0
        };
        const west1 = {
            x: -2,
            y: 0,
            z: 0
        };
        const west2 = {
            x: -3,
            y: 0,
            z: 0
        };
        const west3 = {
            x: -4,
            y: 0,
            z: 0
        };

        const north1 = {
            x: 0,
            y: 2,
            z: 0
        };
        const north2 = {
            x: 0,
            y: 3,
            z: 0
        };

        this.rooms = [room1, north, east, south, west, north1, north2, west1, west2, east1, east2,
            west3, south2];



        this.maxValueOfX = Math.max(...this.rooms.map(coord => coord.x), 0) + 1;
        this.maxValueOfY = Math.max(...this.rooms.map(coord => coord.y), 0) + 1;

        this.minValueOfX = Math.min(...this.rooms.map(coord => coord.x), 0) - 1;
        this.minValueOfY = Math.min(...this.rooms.map(coord => coord.y), 0) - 1;

        console.log("mx x", this.maxValueOfX)
        console.log("mx y", this.maxValueOfY)

        console.log("mn x", this.minValueOfX)
        console.log("mn y", this.minValueOfY)

        this.totalRow = Math.abs(this.maxValueOfY) + Math.abs(this.minValueOfY) + 1;
        this.totalCol = Math.abs(this.maxValueOfX) + Math.abs(this.minValueOfX) + 1;

        console.log("totalRow", this.totalRow)
        console.log("totalCol", this.totalCol)

    }

    isRoom(coords: Coords) {
        // debugger;
        return this.rooms.find(x => x.x === coords.x && x.y === coords.y);
    }


}
