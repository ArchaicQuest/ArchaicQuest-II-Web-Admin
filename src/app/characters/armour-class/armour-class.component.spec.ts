
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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


        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;

        fixture.componentInstance['setArmourRating'](mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });



    it('should update AC when light is equiped', () => {

        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;

        fixture.componentInstance.equipment.get('lightEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });


    it('should update AC when helmet is equiped', () => {

        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;

        fixture.componentInstance.equipment.get('headEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when wasit eq is equiped', () => {

        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;

        fixture.componentInstance.equipment.get('waistEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when neck item is equiped', () => {

        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;

        fixture.componentInstance.equipment.get('neck2Eq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when body item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('bodyEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when torso item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('torsoEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when arms item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('armsEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });



    it('should update AC when legs item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('legsEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });


    it('should update AC when wrist item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('wristEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when wrist 2 item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('wrist2Eq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when finger item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('fingerEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when finger 2 item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('finger2Eq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when heldEq item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('heldEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when shieldEq item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('shieldEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when wieldEq item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('wieldEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when sheathedEq item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('sheathedEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });

    it('should update AC when floatingEq item is equiped', () => {
        fixture.componentInstance.Defense = 0;
        fixture.componentInstance.magicDefense = 0;
        fixture.componentInstance.equipment.get('floatingEq').setValue(mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });


    it('should return armour rating', () => {
        fixture.componentInstance['setArmourRating'](mockItemData);

        expect(fixture.componentInstance.Defense).toBe(5);
        expect(fixture.componentInstance.magicDefense).toBe(3);
    });


});




