
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
import { ReplaySubject, Observable, from, of } from 'rxjs';
import { GetWeaponTypes, GetAttackTypesSuccess, GetWeaponTypesSuccess } from '../../state/add-item.actions';
import { AddItemEffects } from '../../state/add-item.effects';
import { AddItemComponent } from '../../add-item/add-item.component';
import { APP_BASE_HREF } from '@angular/common';
import { EffectsModule, Effect, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';



describe('BaseSelectorComponent', () => {
    let component: WeaponTypeSelectorComponent;
    let fixture: ComponentFixture<WeaponTypeSelectorComponent>;


    function stubService(response: any): any {
        const service = jasmine.createSpyObj('ItemService', ['loadWeaponTypes']);
        service.loadWeaponTypes.and.returnValue(of(response));
        service.loadWeaponTypes.and.returnValue(Promise.resolve(response));
        return service;
    }

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
                AddItemEffects,

            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(WeaponTypeSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });





    fit('should work with effects that only use observables', async () => {
        const itemTypes: ItemType[] = [{
            name: "sword",
            id: 1
        }];

        const actions = new Actions(cold('-a-|', { a: { type: new GetWeaponTypes().type } }));
        const service = stubService(itemTypes);
        const effects = new AddItemEffects(actions, service);

        expect(effects.loadItemTypes).toBeObservable(cold('-a-|',
            { a: { type: new GetWeaponTypesSuccess(itemTypes).type, payload: itemTypes } }));
    });


});


