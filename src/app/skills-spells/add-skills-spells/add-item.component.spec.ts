import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";
import { AddItemComponent } from "./add-skills-spells.component";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { itemRoutes } from "../item.routes";
import { addItemReducer } from "../state/add-item.reducer";
import { StoreModule } from "@ngrx/store";
import { AddItemEffects } from "../state/add-item.effects";
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewItemsComponent } from '../view-items/view-items.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlagEnum } from '../interfaces/flags.enums';
import { Observable } from "rxjs";
import { ArmourTypeSelectorComponent } from '../selectors/armour-type/armour-type-selector.component';
import { WeaponTypeSelectorComponent } from '../selectors/weapon-type/weapon-type-selector.component';
import { ItemTypeSelectorComponent } from '../selectors/item-type/item-type-selector.component';
import { AttackTypeSelectorComponent } from '../selectors/attack-type/attack-type-selector.component';
import { ItemSlotSelectorComponent } from '../selectors/item-slot/item-slot-selector.component';
import { DamageTypeSelectorComponent } from '../selectors/damage-type/damage-type-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

xdescribe('AddItemComponent', () => {
    let component: AddItemComponent;
    let fixture: ComponentFixture<AddItemComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddItemComponent, ViewItemsComponent,
                ItemTypeSelectorComponent,
                WeaponTypeSelectorComponent,
                AttackTypeSelectorComponent,
                ItemSlotSelectorComponent,
                DamageTypeSelectorComponent,
                ArmourTypeSelectorComponent],
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
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it(`should have as title 'ArchaicQuestII'`, async(() => {
    //   const app = fixture.debugElement.componentInstance;
    //   expect(app.title).toEqual('ArchaicQuestII');
    // }));

    describe('Item Flags', () => {

        it('should have flag Anti Evil', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Antievil;
            const hasAntiEvilFlag = app.hasFlag(FlagEnum.Antievil)
            expect(hasAntiEvilFlag).toEqual(true);
        });

        it('should have flag Anti Good', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Antigood;
            const flag = app.hasFlag(FlagEnum.Antigood);
            expect(flag).toEqual(true);
        });

        it('should have flag Anti Neutral', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Antineutral;
            const flag = app.hasFlag(FlagEnum.Antineutral);
            expect(flag).toEqual(true);
        });

        it('should have flag Bless', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Bless;
            const flag = app.hasFlag(FlagEnum.Bless);
            expect(flag).toEqual(true);
        });

        it('should have flag Container', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Container;
            const flag = app.hasFlag(FlagEnum.Container);
            expect(flag).toEqual(true);
        });

        it('should have flag Cursed', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Cursed;
            const flag = app.hasFlag(FlagEnum.Cursed);
            expect(flag).toEqual(true);
        });

        it('should have flag Equipable', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Equipable;
            const flag = app.hasFlag(FlagEnum.Equipable);
            expect(flag).toEqual(true);
        });

        it('should have flag Evil', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Evil;
            const flag = app.hasFlag(FlagEnum.Evil);
            expect(flag).toEqual(true);
        });

        it('should have flag Glow', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Glow;
            const flag = app.hasFlag(FlagEnum.Glow);
            expect(flag).toEqual(true);
        });

        it('should have flag Holy', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Holy;
            const flag = app.hasFlag(FlagEnum.Holy);
            expect(flag).toEqual(true);
        });

        it('should have flag Hum', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Hum;
            const flag = app.hasFlag(FlagEnum.Hum);
            expect(flag).toEqual(true);
        });

        it('should have flag Invis', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Invis;
            const flag = app.hasFlag(FlagEnum.Invis);
            expect(flag).toEqual(true);
        });

        it('should have flag Nodrop', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Nodrop;
            const flag = app.hasFlag(FlagEnum.Nodrop);
            expect(flag).toEqual(true);
        });

        it('should have flag No locate', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Nolocate;
            const flag = app.hasFlag(FlagEnum.Nolocate);
            expect(flag).toEqual(true);
        });

        it('should have flag No remove', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Noremove;
            const flag = app.hasFlag(FlagEnum.Noremove);
            expect(flag).toEqual(true);
        });

        it('should have flag Quest Item', () => {
            const app = component;
            app.selectedFlag = FlagEnum.QuestItem;
            const flag = app.hasFlag(FlagEnum.QuestItem);
            expect(flag).toEqual(true);
        });

        it('should have flag Vampric', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Vampric;
            const flag = app.hasFlag(FlagEnum.Vampric);
            expect(flag).toEqual(true);
        });

        it('should have flag Glow and Hum', () => {
            const app = component;
            app.selectedFlag = FlagEnum.Glow;
            const hasGlowFlag = app.hasFlag(FlagEnum.Glow);
            expect(hasGlowFlag).toEqual(true);

            app.selectedFlag = FlagEnum.Hum;
            const hasHumFlag = app.hasFlag(FlagEnum.Hum);
            expect(hasHumFlag).toEqual(true);
        });

    });

    it('should toggle Armour Section', () => {
        const app = component;

        app.toggleItemSection(0);

        expect(app.showArmourSection).toEqual(true);
        expect(app.showBookSection).toEqual(false);
        expect(app.showContainerSection).toEqual(false);
        expect(app.showWeaponSection).toEqual(false);
    });

    it('should toggle Weapon Section', () => {
        const app = component;

        app.toggleItemSection(11);

        expect(app.showArmourSection).toEqual(false);
        expect(app.showBookSection).toEqual(false);
        expect(app.showContainerSection).toEqual(false);
        expect(app.showWeaponSection).toEqual(true);
    });

    it('should toggle Book Section', () => {
        const app = component;

        app.toggleItemSection(1);

        expect(app.showArmourSection).toEqual(false);
        expect(app.showBookSection).toEqual(true);
        expect(app.showContainerSection).toEqual(false);
        expect(app.showWeaponSection).toEqual(false);
    });
});
