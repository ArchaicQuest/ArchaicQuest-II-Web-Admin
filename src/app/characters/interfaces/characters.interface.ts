import { Stats } from './stats.interface';
import { Attributes } from './attributes.interface';
import { Money } from './money.interface';
import { Affects } from './affects.interface';
import { Config } from './config.interface';
import { ArmourRating } from 'src/app/items/interfaces/armourRating.interface';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Equipment } from './equipment.interface';
import { Events } from './events.interface';

export interface Character {
    id?: string;
    name: string;
    gender: string;
    race: string;
    className: string;
    emotes: string[];
    inventory: Item[];
    equipped: Equipment;
    level: string;
    description: string;
    alignmentScore: number;
    totalExperience?: number;
    experience?: number;
    experienceToNextLevel?: number;
    stats: Stats;
    maxStats: Stats;
    attributes: Attributes;
    maxAttributes: Attributes;
    targetName?: string;
    armorRating: ArmourRating;
    status: string;
    money?: Money;
    qffects?: Affects;
    config?: Config;
    defaultAttack: string;
    commands: string;
    roam?: boolean;
    events?: Events;
}


