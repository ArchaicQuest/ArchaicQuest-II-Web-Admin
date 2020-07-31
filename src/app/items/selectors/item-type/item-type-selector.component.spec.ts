
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { of, Observable, EMPTY } from 'rxjs';
import { GetWeaponTypes, GetWeaponTypesSuccess, AddItemActionTypes } from '../../state/add-item.actions';
import { AddItemEffects } from '../../state/add-item.effects';
import { AddItemComponent } from '../../add-item/add-item.component';
import { APP_BASE_HREF } from '@angular/common';
import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { addItemReducer } from '../../state/add-item.reducer';
import { RouterModule } from '@angular/router';
import { itemRoutes } from '../../item.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemType } from '../../interfaces/item-type.interface';
import { hot, cold } from 'jasmine-marbles';
import { ViewItemsComponent } from '../../view-items/view-items.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, inject, Pipe, PipeTransform, SimpleChange } from '@angular/core';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { ItemService } from '../../add-item/add-item.service';
import { ItemTypeSelectorComponent } from './item-type-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

export class TestActions extends Actions {
    constructor() {
        super(EMPTY);
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

xdescribe('Item Type Selector Component', () => {
    let actions: TestActions;
    let effects: AddItemEffects;
    let itemService: jasmine.SpyObj<ItemService>;
    let fixture: ComponentFixture<ItemTypeSelectorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ItemTypeSelectorComponent, ViewItemsComponent, AddItemComponent],
            imports: [
                BrowserAnimationsModule,
                AppRoutingModule,
                HttpClientModule,
                SharedModule,
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                RouterModule.forChild(itemRoutes),
                StoreModule.forFeature('item', addItemReducer),
                EffectsModule.forFeature([AddItemEffects]),
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                MatCheckboxModule,
                MatButtonModule,
                MatTableModule,
                MatPaginatorModule,
                MatAutocompleteModule
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                {
                    provide: Actions,
                    useFactory: getActions
                },
                {
                    provide: ItemService,
                    useValue: jasmine.createSpyObj('ItemService', ['getWeaponTypes'])
                },
                AddItemEffects

            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });

        actions = TestBed.get(Actions);
        effects = TestBed.get(AddItemEffects);
        itemService = TestBed.get(ItemService);
        fixture = TestBed.createComponent(ItemTypeSelectorComponent);
    });


    // it('should return list of weapon types', () => {

    //     const mockedValue: ItemType[] = [{
    //         name: 'Long Sword',
    //         id: 1
    //     },
    //     {
    //         name: 'Short Sword',
    //         id: 2
    //     }];

    //     const action = new GetWeaponTypes();
    //     const outcome = new GetWeaponTypesSuccess(mockedValue);

    //     actions.stream = hot('-a', { a: action });
    //     const response = cold('-a|', { a: mockedValue });
    //     const expected = cold('--b', { b: outcome });
    //     itemService.getWeaponTypes.and.returnValue(response);

    //     expect(effects.loadWeaponTypes).toBeDefined();
    //     expect(effects.loadWeaponTypes).toBeObservable(expected);


    // });


});




