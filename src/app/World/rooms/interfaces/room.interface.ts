
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Player } from '@angular/core/src/render3/interfaces/player';
import { Description } from 'src/app/shared/interfaces/description.interface';
import { RoomExit } from './roomExit.interface';
import { FormArray } from '@angular/forms';
import { RoomObject } from './roomObject.interface';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { Item } from 'src/app/items/interfaces/item.interface';

export interface Room {
    id?: number;
    areaId?: number;
    title: string;
    description: string;
    exits: RoomExit;
    coords: Coords;
    players: Player[];
    mobs: Mob[];
    items: Item[];
    emotes: string[];
    RoomObjects: RoomObject[];
    updateMessage: string;
    instantRepop: boolean;
}
