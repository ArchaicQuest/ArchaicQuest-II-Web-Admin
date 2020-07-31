

import { RoomExit } from './roomExit.interface';
import { RoomObject } from './roomObject.interface';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Character } from 'src/app/characters/interfaces/characters.interface';

export interface Room {
    id?: number;
    areaId?: number;
    title: string;
    description: string;
    exits: RoomExit;
    coords: Coords;
    players: Character[];
    mobs: Mob[];
    items: Item[];
    emotes: string[];
    roomObjects: RoomObject[];
    updateMessage: string;
    instantRepop: boolean;
}
