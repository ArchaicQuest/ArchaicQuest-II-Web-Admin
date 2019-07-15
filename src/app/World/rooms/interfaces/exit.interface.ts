
import { Coords } from 'src/app/shared/interfaces/coords.interface';

export interface Exit {
    coords: Coords;
    AreaId: number;
    Name: string;
    Door?: boolean;
    Closed?: boolean;
    Locked?: boolean;
    PickProof?: boolean;
    NoPass?: boolean;
    NoScan?: boolean;
    Hidden?: boolean;
    LockId?: string;
}
