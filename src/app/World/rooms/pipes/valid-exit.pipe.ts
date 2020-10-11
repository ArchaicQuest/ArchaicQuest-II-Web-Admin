import { Pipe, PipeTransform } from '@angular/core';
import { RoomTable } from '../../area/interface/area.interface';
import { Room } from '../interfaces/room.interface';
import { ViewAreaService } from '../../area/view-area/view-area.service';
import { Coords } from 'src/app/shared/interfaces/coords.interface';

@Pipe({ name: 'hasNorthWestExit' })
export class hasNorthWestExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom && this.service.hasNorthWestExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'hasNorthExit' })
export class hasNorthExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom && this.service.hasNorthExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'hasNorthEastExit' })
export class hasNorthEastExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom && this.service.hasNorthEastExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'hasEastExit' })
export class hasEastExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom && this.service.hasEastExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'hasSouthEastExit' })
export class hasSouthEastExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom && this.service.hasSouthEastExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'hasSouthExit' })
export class hasSouthExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom && this.service.hasSouthExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'hasSouthWestExit' })
export class hasSouthWestExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom && this.service.hasSouthWestExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'hasWestExit' })
export class hasWestExitPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }

    transform(coords: Coords, rooms: Room[], roomTable: RoomTable): string {

        const isRoom = new isRoomPipe().transform(coords, rooms, "");

        return isRoom && this.service.hasWestExit(roomTable, coords) ? "1" : "";
    }
}

@Pipe({ name: 'isRoom' })
export class isRoomPipe implements PipeTransform {


    transform(coords: Coords, rooms: Room[], prop: string = ""): string {

        const isRoom = rooms.find(x => x.coords.x === coords.x && x.coords.y === coords.y && x.title !== 'add room');

        return isRoom ? isRoom[prop] || isRoom.title : "";
    }
}

@Pipe({ name: 'setRoomClass' })
export class setRoomClassPipe implements PipeTransform {

    constructor(private service: ViewAreaService) {
    }
    transform(coord: Coords, exitDirection: string, roomsTable: RoomTable): string {

        let exitClass = '';

        exitClass += this.service.HasValidExit(roomsTable, coord, exitDirection) ? ' exit--valid ' : ' exit--invalid ';
        exitClass += this.service.isTwoWayExit(roomsTable, coord, exitDirection) ? ` exit--${exitDirection}--twoWay ` : ` exit--${exitDirection}--oneWay `;

        return exitClass;
    }
}