import { Exit } from './exit.interface';


export interface RoomExit {
  north: Exit;
  northEast: Exit;
  east: Exit;
  southEast: Exit;
  south: Exit;
  southWest: Exit;
  west: Exit;
  northWest: Exit;
  up: Exit;
  down: Exit;

}
