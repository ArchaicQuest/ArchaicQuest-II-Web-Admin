import { Item } from '../items/interfaces/item.interface';

export interface IQuest {
    Id: number;
    Title: string;
    Type: string;
    Description: string;
    Area: string;
    ExpGain: number;
    GoldGain: number;
    ItemGain: Item[];
}


