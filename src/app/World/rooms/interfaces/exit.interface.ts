import { Coords } from 'src/app/shared/interfaces/coords.interface';

export interface Exit {
    coords: Coords;
    areaId: number;
    roomId: number;
    name: string;
    keyword?: string;
    door?: boolean;
    closed?: boolean;
    locked?: boolean;
    pickProof?: boolean;
    noPass?: boolean;
    noScan?: boolean;
    hidden?: boolean;
    lockId?: string;
}
