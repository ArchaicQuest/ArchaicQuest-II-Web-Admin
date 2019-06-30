import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Room } from '../../rooms/interfaces/room.interface';

export interface Area {
    id: number;
    title: string;
    description: string;
    dateCreated?: string;
    dateUpdated?: string;
    createdBy?: string;
    modifiedBy?: string[];
    rooms: Room[];
}
