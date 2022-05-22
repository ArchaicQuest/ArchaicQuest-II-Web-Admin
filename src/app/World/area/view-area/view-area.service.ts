import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area, RoomTable } from '../interface/area.interface';
import { Room } from '../../rooms/interfaces/room.interface';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Exit } from '../../rooms/interfaces/exit.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ViewAreaService {
    private host = environment.hostAPI;
    private getAreasUrl = `${this.host}World/Area`;
    private deleteRoomUrl = `${this.host}World/Room/Delete`;

    constructor(private http: HttpClient) { }

    getItemTypes(): Observable<Area[]> {
        return this.http.get<Area[]>(this.getAreasUrl);
    }

    deleteRoom(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.deleteRoomUrl}/${id}`);
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

        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null) {
            return;
        }

        if (!!room.exits[exit] && !!room.exits[exit].coords) {
            const newRoomCoords: Coords = {
                x: (room.exits[exit] as Exit).coords.x,
                y: (room.exits[exit] as Exit).coords.y,
                z: (room.exits[exit] as Exit).coords.z
            };

            const targetRoom = rooms[this.getRoomID(newRoomCoords)];
            if (targetRoom == null) {
                return false;
            }
            if (targetRoom.exits[this.oppositExit(exit)] != null) {
                return true;
            }

        }

        return false;
    }

    HasValidExit(rooms: RoomTable, currentRoom: Coords, exit: string) {
        // console.log(exit);
        //  debugger;

        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null) { return; }

        if (!!room.exits[exit] && !!room.exits[exit].coords) {

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

        return;
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
        // debugger;
        if (room == null || room.exits.north == null || room.exits.north.coords == null) {
            return false;
        }
        return true;
    }
    hasNorthEastExit(rooms: RoomTable, currentRoom: Coords) {
        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null || room.exits.northEast == null || room.exits.northEast.coords == null) {
            return;
        }

        return true;
    }
    hasEastExit(rooms: RoomTable, currentRoom: Coords) {

        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null || room.exits.east == null || room.exits.east.coords == null) {
            return;
        }

        return true;
    }
    hasSouthEastExit(rooms: RoomTable, currentRoom: Coords) {

        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null || room.exits.southEast == null || room.exits.southEast.coords == null) {
            return;
        }

        return true;
    }
    hasSouthExit(rooms: RoomTable, currentRoom: Coords) {
        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null || room.exits.south == null || room.exits.south.coords == null) {
            return;
        }

        return true;
    }
    hasSouthWestExit(rooms: RoomTable, currentRoom: Coords) {
        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null || room.exits.southWest == null || room.exits.southWest.coords == null) {
            return;
        }

        return true;
    }
    hasWestExit(rooms: RoomTable, currentRoom: Coords) {
        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null || room.exits.west == null || room.exits.west.coords == null) {
            return;
        }

        return true;
    }
    hasNorthWestExit(rooms: RoomTable, currentRoom: Coords) {
        const room = rooms[this.getRoomID(currentRoom)];

        if (room == null || room.exits.northWest == null || room.exits.northWest.coords == null) {
            return;
        }

        return true;
    }
}
