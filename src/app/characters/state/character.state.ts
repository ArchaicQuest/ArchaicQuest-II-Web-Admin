import { AppState } from '../../state/app.state';
import { CharacterState } from '../character.state';

export interface CharacterAppState extends AppState {
    character: CharacterState;
}
