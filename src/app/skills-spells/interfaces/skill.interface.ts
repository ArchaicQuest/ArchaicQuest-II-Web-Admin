import { Dice } from './dice.interface';
import { Effect, SkillEffectLocation } from './effect.interface';
import { Requirements } from './requirements.interface';
import { Messages, LevelBasedMessages } from './message.interface';
import { SkillCost } from './skill-cost.interface';
import { SkillType } from './skill-type.interface';
import { validTargets } from './targets.enum';

export interface Skill {
    id?: number;
    name: string;
    description: string;
    formula: string;
    damage: Dice;
    effect?: Effect; // deprecated
    spellAffects?: Effect[];
    rounds: number;
    cost: SkillCost;
    type: SkillType;
    validTargets?: validTargets;
    skillMessage?: SkillMessage;
    startsCombat?: boolean;
    savingThrow?: SavingThrow
}

export interface SkillMessage {
    miss: Messages;
    death: Messages;
    hit: Messages
}

export interface SavingThrow {
    reflex: boolean;
    mental: boolean;
    strength: boolean
}

