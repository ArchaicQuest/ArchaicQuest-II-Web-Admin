import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CharacterActionTypes, SaveCharSuccess, SaveChar } from './character.actions';
import { switchMap, map, catchError, concatMap, mergeMap } from 'rxjs/operators';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { MobService } from 'src/app/mobs/add-mob.service';
import { Action } from '@ngrx/store';


@Injectable()
export class CharacterEffects {
    constructor(private actions$: Actions, private mobService: MobService, ) { }

    @Effect()
    addMob: Observable<Action> = this.actions$.pipe(
        ofType(CharacterActionTypes.SaveCharacter),
        map((action: SaveChar) =>
            this.mobService.saveMob(action.payload).pipe(
                mergeMap((item: Mob) => (new SaveCharSuccess())),
                catchError(err => of(new console.log(err)))
            )
        )
    );
}
