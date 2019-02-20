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
import { HttpClientModule, HttpParams } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ViewItemsComponent } from "../view-items/view-items.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { FlagEnum } from "../interfaces/flags.enums";
import { Observable } from 'rxjs';
import { ArmourTypeSelectorComponent } from '../selectors/armour-type/armour-type-selector.component';
import { WeaponTypeSelectorComponent } from '../selectors/weapon-type/weapon-type-selector.component';
import { ItemTypeSelectorComponent } from '../selectors/item-type/item-type-selector.component';
import { AttackTypeSelectorComponent } from '../selectors/attack-type/attack-type-selector.component';
import { ItemSlotSelectorComponent } from '../selectors/item-slot/item-slot-selector.component';
import { DamageTypeSelectorComponent } from '../selectors/damage-type/damage-type-selector.component';
import { ItemService } from './add-item.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ItemType } from '../interfaces/item-type.interface';
import { Item } from '../interfaces/item.interface';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

fdescribe('AddItemComponent', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;
  const host = 'http://localhost:57814/api/';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ItemService]
    });

    service = TestBed.get(ItemService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Service Properties', () => {
    it('should have host property set', () => {
      expect(service['host']).toEqual('http://localhost:57814/api/');
    });

    it('should have armour type URL property set', () => {
      expect(service['armourTypeUrl']).toEqual(`${host}item/ReturnArmourTypes`);
    });

    it('should have attack type URL property set', () => {
      expect(service['attackTypeUrl']).toEqual(`${host}item/ReturnAttackTypes`);
    });

    it('should have damage type URL property set', () => {
      expect(service['damageTypeUrl']).toEqual(`${host}item/ReturnDamageTypes`);
    });

    it('should have item type URL property set', () => {
      expect(service['itemTypeUrl']).toEqual(`${host}item/ReturnItemTypes`);
    });

    it('should have item slot URL property set', () => {
      expect(service['itemSlotUrl']).toEqual(`${host}item/ReturnSlotTypes`);
    });

    it('should have weapon type URL property set', () => {
      expect(service['weaponTypeUrl']).toEqual(`${host}item/ReturnWeaponTypes`);
    });

    it('should have flag type URL property set', () => {
      expect(service['flagTypeUrl']).toEqual(`${host}item/ReturnFlagTypes`);
    });

    it('should have add item URL property set', () => {
      expect(service['addItemUrl']).toEqual(`${host}item/PostItem`);
    });

    //TODO:
    // private autoCompleteUrl = `${this.host}item/FindItems?query=`;
    // private findKeyUrl = `${this.host}item/FindKeys?query=`;
    // private containerSizeUrl = `${this.host}/item/containersize`;
    // private LockStrengthUrl = `${this.host}/item/LockStrength`;
    // private findItemByIdUrl = `${this.host}item/FindItemById?id=`;
    // private findKeyByIdUrl = `${this.host}item/FindKeyById?id=`;
  });

  describe('api calls', () => {
    it('Should return Item types observable', () => {
      const mockData: ItemType[] = [
        { id: 0, name: 'weapon' },
        { id: 1, name: 'Armour' }
      ];

      service.getItemTypes().subscribe(itemTypes => {
        expect(itemTypes.length).toBe(2);
        expect(itemTypes).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${host}item/ReturnItemTypes`);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('Should return Item by ID', () => {
      const mockData: Item = {
        id: 0,
          name: 'item',
          armourRating: {
            armour: 0,
            magic: 0
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
      service.findItemById('1').subscribe(item => {
        expect(item).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${host}item/FindItemById?id=1`);
      req.flush(mockData);

    });

    it('Should return Item by ID', () => {
      const mockData: Item = {
        id: 0,
          name: 'item',
          armourRating: {
            armour: 0,
            magic: 0
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
      service.findItemById('1').subscribe(item => {
        expect(item).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${host}item/FindItemById?id=1`);
      req.flush(mockData);

    });

    it('Should return key by ID', () => {
      const mockData: Item = {
        id: 0,
          name: 'key',
          armourRating: {
            armour: 0,
            magic: 0
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
      service.findKeyById('1').subscribe(item => {
        expect(item).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${host}item/FindKeys?query=1`);
      req.flush(mockData);

    });
  });
});
