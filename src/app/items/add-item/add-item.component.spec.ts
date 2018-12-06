import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";
import { AddItemComponent } from "./add-item.component";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { itemRoutes } from "../item.routes";
import { addItemReducer } from "../state/add-item.reducer";
import { StoreModule } from "@ngrx/store";
import { AddItemEffects } from "../state/add-item.effects";
import { EffectsModule } from "@ngrx/effects";
import {
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatTableModule,
  MatButtonModule,
  MatPaginatorModule,
  MatAutocompleteModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ViewItemsComponent } from "../view-items/view-items.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { FlagEnum } from "../interfaces/flags.enums";

fdescribe("AddItemComponent", () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemComponent, ViewItemsComponent],
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forChild(itemRoutes),
        StoreModule.forFeature("item", addItemReducer),
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
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
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

  it('should have flag Anti Evil', () => {
    const app = component;
    app.selectedFlag = FlagEnum.Antievil;
    const hasAntiEvilFlag = app.hasFlag(FlagEnum.Antievil);
    expect(hasAntiEvilFlag).toEqual(true);
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
