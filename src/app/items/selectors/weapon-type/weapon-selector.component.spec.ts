
import {
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatAutocompleteModule
} from '@angular/material';
import { WeaponTypeSelectorComponent } from './weapon-type-selector.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReplaySubject, Observable, from, of, BehaviorSubject } from 'rxjs';
import { GetWeaponTypes, GetAttackTypesSuccess, GetWeaponTypesSuccess } from '../../state/add-item.actions';
import { AddItemEffects } from '../../state/add-item.effects';
import { AddItemComponent } from '../../add-item/add-item.component';
import { APP_BASE_HREF } from '@angular/common';
import { EffectsModule, Effect, Actions } from '@ngrx/effects';
import { StoreModule, Store, select } from '@ngrx/store';
import { addItemReducer } from '../../state/add-item.reducer';
import { RouterModule } from '@angular/router';
import { itemRoutes } from '../../item.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemService, } from '../../add-item/add-item.service';
import { ItemType } from '../../interfaces/item-type.interface';
import { EffectsRunner } from '@ngrx/effects/src/effects_runner';
import { TestScheduler } from 'rxjs/testing';
import { hot, cold } from 'jasmine-marbles';
import { ViewItemsComponent } from '../../view-items/view-items.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, inject, Pipe, PipeTransform } from '@angular/core';
import { ItemState } from '../../item.state';
import { map } from 'rxjs/operators';
import { ItemAppState } from '../../state/add-item.state';
import { getWeaponTypes } from '../../state/add-item.selector';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMagicalMock, Mock } from 'angular-testing-library';

describe('Weapon Selector Component', () => {
    let component: WeaponTypeSelectorComponent;
    let fixture: ComponentFixture<WeaponTypeSelectorComponent>;
    let effects: AddItemEffects;
    let actions: Observable<any>;
    let service: Mock<ItemService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WeaponTypeSelectorComponent, ViewItemsComponent, AddItemComponent],
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
                provideMockActions(() => actions),
                provideMagicalMock(ItemService),
                AddItemEffects,

            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        effects = TestBed.get(AddItemEffects);
        service = TestBed.get(ItemService);
        fixture = TestBed.createComponent(WeaponTypeSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should return list of weapon', async () => {

        const mockedValue: ItemType[] = [{
            name: 'sword',
            id: 1
        }];

        const action = new GetWeaponTypes();
        const result = new GetWeaponTypesSuccess(mockedValue);

        actions = of(action);
        const response = cold('-a|', { a: mockedValue });
        const expected = cold('-b|', { b: result });


        service.getWeaponTypes.and.returnValue(response);


        expect(effects.loadWeaponTypes).toBeObservable(expected);
    });


});


