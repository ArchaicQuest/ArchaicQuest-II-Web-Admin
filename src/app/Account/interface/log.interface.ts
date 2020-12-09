export interface Log {
    id: number;
    username: string;
    detail: string;
    type: DBEnum;
    created?: Date
}

export enum DBEnum {
    Account = 0,
    Alignment = 1,
    Area = 2,
    AttackType = 3,
    Class = 4,
    Items = 5,
    Mobs = 6,
    Players = 7,
    Race = 8,
    Room = 9,
    Skill = 10,
    Status = 11,
    Config = 12,
    Socials = 13,
    Quests = 14,
    Users = 15,
    Log = 16
}