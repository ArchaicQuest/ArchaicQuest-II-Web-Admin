import { Attributes } from 'src/app/characters/interfaces/attributes.interface';
import { Status } from 'src/app/characters/interfaces/status.interface';

export interface Requirements {
    minLevel: number;
    good: boolean;
    neutral: boolean;
    evil: boolean;
    male: boolean;
    female: boolean;
    minAttributes: Attributes;
    usableFromStatus: Status;
}
