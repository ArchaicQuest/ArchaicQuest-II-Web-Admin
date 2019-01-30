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
import { of } from 'rxjs';
import { GetWeaponTypes, GetWeaponTypesSuccess } from '../../state/add-item.actions';
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
import { hot } from 'jasmine-marbles';
import { ViewItemsComponent } from '../../view-items/view-items.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, inject, Pipe, PipeTransform, SimpleChange } from '@angular/core';


describe('Weapon Type Selector Component', () => {
    let component: WeaponTypeSelectorComponent;
    let fixture: ComponentFixture<WeaponTypeSelectorComponent>;

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
        spyOn(component, 'onChange').and.callThrough();

        fixture.detectChanges();
    });


    function stubItemService(response: any): any {
        const service = jasmine.createSpyObj('ItemService', ['getWeaponTypes']);
        service.getWeaponTypes.and.returnValue(of(response));
        return service;
    }

    fit('should return list of weapon types', async (done: DoneFn) => {

        const mockedValue: ItemType[] = [{
            name: 'Long Sword',
            id: 1
        },
        {
            name: 'Short Sword',
            id: 2
        }];

        const action = new Actions(hot('-a-|', { a: new GetWeaponTypes() }));
        const service = stubItemService(mockedValue);
        const effects = new AddItemEffects(action, service);

       // expect(effects.loadWeaponTypes).toBeObservable(hot('-a-|', { a: new GetWeaponTypesSuccess(mockedValue) }));


        fixture.whenStable().then(() => {
            expect(fixture.componentInstance.weaponTypes.length).toBe(2);
        });

        done();
    });

});

