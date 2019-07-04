import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area, RoomTable } from '../interface/area.interface';
import { Room } from '../../rooms/interfaces/room.interface';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Exit } from '../../rooms/interfaces/exit.interface';

@Injectable({
    providedIn: 'root'
})
export class ViewAreaService {
    private host = 'http://localhost:57814/api/';
    private getAreasUrl = `${this.host}World/Area`;

    constructor(private http: HttpClient) { }

    getItemTypes(): Observable<Area[]> {
        return this.http.get<Area[]>(this.getAreasUrl);
    }

    getRoomID(coords: Coords) {

        if (coords == null) { return; }

        return JSON.stringify(coords).replace(/\"([^(\")"]+)\":/g, '$1:');
    }

    oppositExit(exit: string) {
        switch (exit) {
            case 'North':
                return 'South';
            case 'NorthEast':
                return 'SouthWest';
            case 'East':
                return 'West';
            case 'SouthEast':
                return 'NorthWest';
            case 'South':
                return 'North';
            case 'SouthWest':
                return 'NorthEast';
            case 'West':
                return 'East';
            case 'NorthWest':
                return 'SouthEast';
        }
    }

    isTwoWayExit(rooms: RoomTable, currentRoom: Coords, exit: string) {
        console.log(exit)

        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null) {
            return;
        }

        if (!!room.exits[exit]) {

            const newRoomCoords: Coords = {
                x: (room.exits[exit] as Exit).coords.x,
                y: (room.exits[exit] as Exit).coords.y,
                z: (room.exits[exit] as Exit).coords.z
            };

            const targetRoom = rooms[this.getRoomID(newRoomCoords)];
            if (targetRoom == null) {
                return;
            }
            if (targetRoom.exits[this.oppositExit(exit)] != null) {
                return true;
            }

        }

        return false;
    }

    HasValidExit(rooms: RoomTable, currentRoom: Coords, exit: string) {
        console.log(exit)

        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null) {
            return;
        }

        if (!!room.exits[exit]) {

            const newRoomCoords: Coords = {
                x: (room.exits[exit] as Exit).coords.x,
                y: (room.exits[exit] as Exit).coords.y,
                z: (room.exits[exit] as Exit).coords.z
            };

            const targetRoom = rooms[this.getRoomID(newRoomCoords)];

            if (targetRoom != null) {
                return true;
            } else {
                return false;
            }

        }

        return false;
    }

    isRoom(rooms: RoomTable, roomCoords: Coords) {
        const room = rooms[this.getRoomID(roomCoords)];

        if (room == null) {
            return false;
        }

        return true;
    }
    hasNorthExit(rooms: RoomTable, currentRoom: Coords) {

        const room = rooms[this.getRoomID(currentRoom)];

        if (room != null && room.exits.north == null) {
            return;
        }
        return true;
    }
    hasNorthEastExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x + 1 && x.coords.y === currentRoom.y + 1);
    }
    hasEastExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x + 1 && x.coords.y === currentRoom.y);
    }
    hasSouthEastExit(rooms: RoomTable, currentRoom: Coords) {

        const room = rooms[this.getRoomID(currentRoom)];

        if (room != null && room.exits.southEast == null) {
            return;
        }

        return true;
    }
    hasSouthExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x && x.coords.y === currentRoom.y - 1);
    }
    hasSouthWestExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x - 1 && x.coords.y === currentRoom.y - 1);
    }
    hasWestExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x - 1 && x.coords.y === currentRoom.y);
    }
    hasNorthWestExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x - 1 && x.coords.y === currentRoom.y + 1);
    }
}
