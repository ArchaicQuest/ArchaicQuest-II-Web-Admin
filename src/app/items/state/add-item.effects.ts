import { Actions, Effect, ofType } from '@ngrx/effects';

import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { ItemType } from '../interfaces/item-type.interface';
import { ItemService } from '../add-item/add-item.service';
import { Action } from '@ngrx/store';
import { AddItemActionTypes, GetItemTypes, GetItemTypesSuccess, GetItemTypesFail, GetItemSlotTypes, GetItemSlotTypesSuccess, GetArmourTypes, GetArmourTypesSuccess, GetItemSlotTypesFail, GetArmourTypesFail, PostItemSuccess, PostItem, PostItemFail, GetFlags, GetFlagsSuccess, GetFlagsFail, GetWeaponTypes, GetWeaponTypesSuccess, GetWeaponTypesFail, GetAttackTypesFail, GetAttackTypesSuccess, GetAttackTypes, GetDamgeTypesFail, GetDamageTypesSuccess, GetDamageTypes } from './add-item.actions';
import { Item } from '../interfaces/item.interface';

@Injectable()
export class AddItemEffects {
    constructor(private actions$: Actions, private addItemService: ItemService) { }

    @Effect()
    loadItemTypes: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.GetItemTypes),
        mergeMap((action: GetItemTypes) =>
            this.addItemService.getItemTypes().pipe(
                map((itemTypes: ItemType[]) => (new GetItemTypesSuccess(itemTypes))),
                catchError(err => of(new GetItemTypesFail(err)))
            )
        )
    );

    @Effect()
    loadItemSlotTypes: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.GetItemSlotTypes),
        mergeMap((action: GetItemSlotTypes) =>
            this.addItemService.getItemSlot().pipe(
                map((slotTypes: ItemType[]) => (new GetItemSlotTypesSuccess(slotTypes))),
                catchError(err => of(new GetItemSlotTypesFail(err)))
            )
        )
    );

    @Effect()
    loadArmourSlotTypes: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.GetItemArmourTypes),
        mergeMap((action: GetArmourTypes) =>
            this.addItemService.getArmourTypes().pipe(
                map((armourTypes: ItemType[]) => (new GetArmourTypesSuccess(armourTypes))),
                catchError(err => of(new GetArmourTypesFail(err)))
            )
        )
    );

    @Effect()
    loadWeaponTypes: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.GetItemWeaponTypes),
        mergeMap((action: GetWeaponTypes) =>
            this.addItemService.getWeaponTypes().pipe(
                map((weaponTypes: ItemType[]) => (new GetWeaponTypesSuccess(weaponTypes))),
                catchError(err => of(new GetWeaponTypesFail(err)))
            )
        )
    );

    @Effect()
    loadAttackTypes: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.GetItemAttackTypes),
        mergeMap(() =>
            this.addItemService.getAttackTypes().pipe(
                map((attackTypes: ItemType[]) => (new GetAttackTypesSuccess(attackTypes))),
                catchError(err => of(new GetAttackTypesFail(err)))
            )
        )
    );

    @Effect()
    loadDamageTypes: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.GetItemDamageTypes),
        mergeMap(() =>
            this.addItemService.getDamageTypes().pipe(
                map((damageTypes: ItemType[]) => (new GetDamageTypesSuccess(damageTypes))),
                catchError(err => of(new GetDamgeTypesFail(err)))
            )
        )
    );


    @Effect()
    loadFlags: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.GetItemFlags),
        mergeMap((action: GetFlags) =>
            this.addItemService.getFlagTypes().pipe(
                map((flags: ItemType[]) => (new GetFlagsSuccess(flags))),
                catchError(err => of(new GetFlagsFail(err)))
            )
        )
    );

    @Effect()
    addITem: Observable<Action> = this.actions$.pipe(
        ofType(AddItemActionTypes.PostItem),
        map((action: PostItem) =>
            this.addItemService.addItem(action.payload).pipe(
                map((item: Item) => (new PostItemSuccess())),
                catchError(err => of(new PostItemFail(err)))
            )
        )
    );
}
