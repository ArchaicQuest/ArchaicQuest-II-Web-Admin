import { Stats } from './stats.interface';
import { Attributes } from './attributes.interface';
import { Money } from './money.interface';
import { Affects } from './affects.interface';
import { Config } from './config.interface';

export interface Character {
  id?: number;
  name: string;
  gender: string;
  race: string;
  className: string;
  level: string;
  description: string;
  alignmentScore: number;
  totalExperience: number;
  experience: number;
  experienceToNextLevel: number;
  stats: Stats;
  maxStats: Stats;
  attributes: Attributes;
  maxAttributes: Attributes;
  targetName?: string;
  armorRating: number;
  money: Money;
  qffects: Affects;
  config: Config;
}
