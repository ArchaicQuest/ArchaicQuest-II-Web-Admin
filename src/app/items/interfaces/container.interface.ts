import { Item } from './item.interface';

export interface Container {
  size: number;
  items?: Item[];
  IsOpen?: boolean;
  IsLocked?: boolean;
  AssociatedKeyId?: string;
}
