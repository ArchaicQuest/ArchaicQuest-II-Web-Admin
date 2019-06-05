
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Player } from '@angular/core/src/render3/interfaces/player';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Description } from 'src/app/shared/interfaces/description.interface';
import { RoomExit } from './roomExit.interface';

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
 RoomObjects: Description;
 updateMessage: string;
 instantRepop: boolean;
}
