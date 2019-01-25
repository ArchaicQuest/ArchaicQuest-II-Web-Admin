import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';


@Injectable()
export class CharacterEffects {
    constructor(private actions$: Actions, ) { }
}
