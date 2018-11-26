import { Description } from '../../shared/interfaces/description.interface';
import { ItemModifier } from './item-modifier.interface';
import { Damage } from './damage.interface';
import { ArmourRating } from './armourRating.interface';
import { Book } from './book.interface';
import { Container } from './container.interface';

export interface Item {
    id?: number;
    name: string;
    knownByName: boolean;
    description: Description;
    book: Book;
    container: Container;
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
    level: string;
    modifier?: ItemModifier;
    containerItems?: Item[];
    damageType: number;
    itemFlag: number;
    attackType: number;
    weaponType: number;
    damage: Damage;
    weight: number;
    uses?: number;
    infinite: boolean;
    forageRank: number;
    armourRating: ArmourRating;
    armourType: number;
}
