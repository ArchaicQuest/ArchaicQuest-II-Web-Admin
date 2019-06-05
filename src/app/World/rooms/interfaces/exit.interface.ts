
import { Coords } from 'src/app/shared/interfaces/coords.interface';

export interface Exit {
  coords: Coords;
  AreaId: number;
  Name: string;
  Open?: boolean;
  CanOpen?: boolean;
  CanLock?: boolean;
  Locked?: boolean;
  LockId?: string;
}
