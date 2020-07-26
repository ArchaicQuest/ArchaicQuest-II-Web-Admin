import { Dice } from 'src/app/class/interfaces/dice.interface';
import { Attributes } from './attributes.interface';

export interface SkillList {
    skillId: number;
    skillName: string;
    level: number;
}

export interface Class {
    id: number;
    name: string;
    description: string;
    skills?: SkillList[];
    attributeBonus?: Attributes;
    hitDice?: Dice;
}
