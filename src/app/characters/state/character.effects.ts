import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CharacterActionTypes, SaveCharSuccess, SaveChar } from './character.actions';
import { switchMap, map, catchError, concatMap, mergeMap } from 'rxjs/operators';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';

import { Action } from '@ngrx/store';
import { AddMobService } from 'src/app/mobs/add-mob.service';


@Injectable()
export class CharacterEffects {
    constructor(private actions$: Actions, private mobService: AddMobService, ) { }

    @Effect()
    addMob: Observable<Action> = this.actions$.pipe(
        ofType(CharacterActionTypes.SaveCharacter),
        mergeMap((action: SaveChar) =>
            this.mobService.saveMob(action.payload).pipe(
                map(() => (new SaveCharSuccess())),
                catchError(err => of(new console.log(err)))
            )
        )
    );
}
