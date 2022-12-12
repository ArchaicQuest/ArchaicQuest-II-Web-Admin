import { Description } from '../../shared/interfaces/description.interface';
import { ItemModifier } from './item-modifier.interface';
import { Damage } from './damage.interface';
import { ArmourRating } from './armourRating.interface';
import { Book } from './book.interface';
import { Container } from './container.interface';
import { EqSlot } from 'src/app/characters/equipment/equipment.enum';


export interface ItemData {
    item: Item,
    updateAllInstances: boolean
}
export interface Item {
    uuid?: any;
    id?: number;
    name: string;
    knownByName: boolean;
    description: Description;
    book: Book;
    container: Container;
    keyId?: string;
    keywords: string[];
    isHiddenInRoom: boolean;
    hidden: boolean;
    stuck: boolean;
    decayTimer: number;
    condition: number;
    questItem: boolean;
    itemType: string;
    slot: EqSlot | any;
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
    equipped: boolean;
    value?: number;
    portal: Portal;
    isTwoHanded: boolean;
    spellName?: string;
    spellLevel?: number;
}


export interface Portal {
    name: string;
    destination: string;
    enterDescription: string;
    enterDescriptionRoom: string;
}
