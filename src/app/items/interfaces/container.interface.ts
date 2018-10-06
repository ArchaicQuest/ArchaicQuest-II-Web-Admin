import { Item } from './item.interface';

export interface Container {
    size: number;
    items?: Item[];
    canOpen: boolean;
    isOpen?: boolean;
    canLock: boolean;
    isLocked?: boolean;
    associatedKeyId?: string;
    goldPieces: number;
}
