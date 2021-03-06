import { Dice } from './dice.interface';
import { Effect } from './effect.interface';
import { Requirements } from './requirements.interface';
import { Messages, LevelBasedMessages } from './message.interface';
import { SkillCost } from './skill-cost.interface';
import { SkillType } from './skill-type.interface';

export interface Skill {
    id?: number;
    name: string;
    description: string;
    damage: Dice;
    effect: Effect;
    rounds: number;
    cost: SkillCost;
    type: SkillType;
}