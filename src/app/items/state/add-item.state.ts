import { AppState } from '../../state/app.state';
import { ItemState } from '../item.state';

export interface ItemAppState extends AppState {
    item: ItemState;
}
