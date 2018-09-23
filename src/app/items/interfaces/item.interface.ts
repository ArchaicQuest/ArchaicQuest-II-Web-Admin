import { Description } from '../../shared/interfaces/description.interface';
import { ItemModifier } from './item-modifier.interface';
import { Damage } from './damage.interface';
import { ArmourRating } from './armourRating.interface';

export interface Item {
    name: string;
    knownByName: boolean;
    description: Description;
    // Alt selector
    keywords: string[];
    isHiddenInRoom: boolean;
    hidden: boolean;
    stuck: boolean;
    decayTimer: number;
    condition: number;
    questItem: boolean;
    itemType: string;
    slot: string;
    minLevel: string;
    modifiers?: ItemModifier;
    containerItems?: Item[];
    damageType: number;
    itemFlags: number[];
    attackType: number;
    weaponType: number;
    damage: Damage;
    weight: number;
    uses?: number;
    infinite: boolean;
    forageRank: number;
    armourRating: ArmourRating;
}
