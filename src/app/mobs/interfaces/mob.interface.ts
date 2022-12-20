import { Character } from 'src/app/characters/interfaces/characters.interface';

export interface MobData {
    mob: Mob,
    updateAllInstances: boolean
}


// tslint:disable-next-line:no-empty-interface
export interface Mob extends Character {
    longName: string;
}

export interface Player extends Character {
    longName: string;
    commandLog: string[];
    userRole: number;
}

export interface Stats {
    mobKills: number;
    playerKills: number;
    deaths: number;
    totalPlayTime: number;
    exploredRooms: number;
}

export interface Account {
    id: string;
    userName: string;
    password: string;
    email: string;
    emailVerified: boolean;
    stats: Stats;
    characters: string[];
    dateJoined: Date;
    credits: number;
}