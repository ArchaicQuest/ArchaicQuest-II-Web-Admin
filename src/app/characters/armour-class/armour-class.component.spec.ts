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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item.interface';
import { ArmourClassComponent } from './armour-class.component';


describe('Armour Rating Component', () => {
    let fixture: ComponentFixture<ArmourClassComponent>;
    const mockItemData: Item = {
        id: 0,
        name: 'key',
        armourRating: {
            armour: 5,
            magic: 3
        },
        armourType: 1,
        attackType: 0,
        book: null,
        condition: 1,
        container: null,
        containerItems: null,
        damage: {
            maximum: 2,
            minimum: 1
        },
        damageType: 1,
        decayTimer: 1,
        description: {
            exam: '',
            look: '',
            room: '',
            smell: '',
            taste: '',
            touch: ''
        },
        forageRank: 1,
        hidden: false,
        infinite: false,
        isHiddenInRoom: false,
        itemFlag: null,
        itemType: '1',
        keywords: null,
        knownByName: false,
        level: '1',
        questItem: false,
        slot: 1,
        stuck: false,
        weaponType: 1,
        weight: 0
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ArmourClassComponent],
            imports: [
                BrowserAnimationsModule,
                AppRoutingModule,
                HttpClientModule,
                SharedModule,
                ReactiveFormsModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
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
                FormBuilder
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });


        fixture = TestBed.createComponent(ArmourClassComponent);
        fixture.componentInstance.equipment = new FormBuilder().group({
            armsEq: [''],
            bodyEq: [''],
            faceEq: [''],
            feetEq: [''],
            fingerEq: [''],
            finger2Eq: [''],
            floatingEq: [''],
            handsEq: [''],
            heldEq: [''],
            legsEq: [''],
            lightEq: [''],
            neckEq: [''],
            neck2Eq: [''],
            shieldEq: [''],
            torsoEq: [''],
            waistEq: [''],
            wristEq: [''],
            wrist2Eq: [''],
            headEq: [''],
            sheathedEq: [''],
            wieldEq: ['']
        });

        fixture.detectChanges();


    });







    it('should return armour rating', () => {



        fixture.componentInstance['setArmourRating'](mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    // this.equipment.get('lightEq').valueChanges.subscribe((value: Item) => {
    //   this.setArmourRating(value);
    // });


    fit('should update AC when helmet is equiped', () => {


        //  fixture.componentInstance.subscribeToEQChanges();
        fixture.componentInstance.equipment.get('lightEq').setValue(mockItemData);

        fixture.detectChanges();

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });



    it('should return armour rating', () => {
        fixture.componentInstance['setArmourRating'](mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });


});




