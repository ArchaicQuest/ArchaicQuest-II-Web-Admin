import { AppState } from '../../state/app.state';
import { ICharacterState } from './character.reducer';

export interface CharacterState extends AppState {
    character: ICharacterState;
}
