import { Item } from '../items/interfaces/item.interface';

export interface IQuest {
    id: number;
    title: string;
    type: string;
    description: string;
    area: string;
    expGain: number;
    goldGain: number;
    itemGain: Item[];
    mobsToKill: KillQuest[];
    itemsToGet: KillQuest[];
}


export interface KillQuest {
    name: string;
    count: number;
}
