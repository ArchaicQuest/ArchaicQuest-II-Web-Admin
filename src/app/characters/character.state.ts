import { Item } from '../items/interfaces/item.interface';
import { Mob } from '../mobs/interfaces/mob.interface';

export interface CharacterState {
    inventory: Item[];
    mob: Mob;
}
