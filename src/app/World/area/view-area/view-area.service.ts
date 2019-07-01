import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../interface/area.interface';
import { Room } from '../../rooms/interfaces/room.interface';
import { Coords } from 'src/app/shared/interfaces/coords.interface';

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

    isTwoWayExit(rooms: Room[], currentRoom: Coords) {

        if (currentRoom == null || currentRoom.x == null) {
            return false;
        }
        const coords: Coords = {
            x: currentRoom.x,
            y: currentRoom.y + 1,
            z: currentRoom.z
        };

        return this.hasNorthExit(rooms, currentRoom) && this.hasSouthExit(rooms, coords);
    }

    hasNorthExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x && x.coords.y === currentRoom.y + 1);
    }
    hasNorthEastExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x + 1 && x.coords.y === currentRoom.y + 1);
    }
    hasEastExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x + 1 && x.coords.y === currentRoom.y);
    }
    hasSouthEastExit(rooms: Room[], currentRoom: Coords) {
        return rooms.find(x => x.coords.x === currentRoom.x + 1 && x.coords.y === currentRoom.y - 1);
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
