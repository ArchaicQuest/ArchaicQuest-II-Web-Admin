import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from './add-item.service';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { ItemType } from '../interfaces/item-type.interface';
import { Item } from '../interfaces/item.interface';
import { FlagEnum } from '../interfaces/flags.enums';

describe('AddItemComponent', () => {
    let service: ItemService;
    let httpMock: HttpTestingController;
    const host = 'http://localhost:57814/api/';
    const mockItemData: Item[] = [
        {
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
        }
    ];
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

    it('Service return add item form', () => {
        expect(service.getAddItemForm()).toBeTruthy();
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

        // TODO:
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

        it('Should return Item slots observable', () => {
            const mockData: ItemType[] = [
                { id: 0, name: 'head' },
                { id: 1, name: 'arms' }
            ];

            service.getItemSlot().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/ReturnSlotTypes`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return weapon types observable', () => {
            const mockData: ItemType[] = [
                { id: 0, name: 'Axe' },
                { id: 1, name: 'Sword' }
            ];

            service.getWeaponTypes().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/ReturnWeaponTypes`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return damage types observable', () => {
            const mockData: ItemType[] = [
                { id: 0, name: 'Acid' },
                { id: 1, name: 'Flame' }
            ];

            service.getDamageTypes().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/ReturnDamageTypes`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return attack types observable', () => {
            const mockData: ItemType[] = [
                { id: 0, name: 'Chop' },
                { id: 1, name: 'Slice' }
            ];

            service.getAttackTypes().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/ReturnAttackTypes`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return armour types observable', () => {
            const mockData: ItemType[] = [
                { id: 0, name: 'leather' },
                { id: 1, name: 'plate mail' }
            ];

            service.getArmourTypes().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/ReturnArmourTypes`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return flag types observable', () => {
            const mockData: ItemType[] = [
                { id: 0, name: 'Evil' },
                { id: 1, name: 'Good' }
            ];

            service.getFlagTypes().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/ReturnFlagTypes`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return get Container Size observable', () => {
            const mockData: ItemType[] = [{ id: 0, name: 'x' }, { id: 1, name: 'y' }];

            service.getContainerSize().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/containersize`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return get lock strength observable', () => {
            const mockData: ItemType[] = [{ id: 0, name: 'x' }, { id: 1, name: 'y' }];

            service.getLockStrength().subscribe(x => {
                expect(x.length).toBe(2);
                expect(x).toEqual(mockData);
            });

            const req = httpMock.expectOne(`${host}item/LockStrength`);
            expect(req.request.method).toBe('GET');
            req.flush(mockData);
        });

        it('Should return Item by ID', () => {
            service.findItemById('1').subscribe(item => {
                expect(item).toEqual(mockItemData[0]);
            });

            const req = httpMock.expectOne(`${host}item/FindItemById?id=1`);
            req.flush(mockItemData[0]);
        });

        it('Should return key Items by name', () => {
            service.findKeyItems('key').subscribe(item => {
                expect(item).toEqual(mockItemData);
            });

            const req = httpMock.expectOne(`${host}item/FindKeys?query=key`);

            req.flush(mockItemData);
        });

        it('Should return key by ID', () => {
            service.findKeyById('1').subscribe(item => {
                expect(item).toEqual(mockItemData[0]);
            });

            const req = httpMock.expectOne(`${host}item/FindKeyById?id=1`);

            req.flush(mockItemData[0]);
        });

        it('Should post Item to server', () => {
            service.addItem(mockItemData[0]).subscribe(response => {
                expect(response).toEqual(JSON.stringify(mockItemData[0]));
            });

            const req = httpMock.expectOne({
                url: `${host}item/PostItem`,
                method: 'POST'
            });

            expect(req.request.method).toEqual('POST');
            req.flush(mockItemData[0]);
        });

        it('Should return Items by name', () => {
            service.autocompleteItems('key').subscribe(item => {
                expect(item).toEqual(mockItemData);
            });

            const req = httpMock.expectOne(`${host}item/FindItems?query=key`);

            req.flush(mockItemData);
        });
    });

    describe('has flag set', () => {
        it('should have bless flag set', () => {
            expect(service.hasFlag(8, FlagEnum.Bless)).toBeTruthy();
        });

        it('should have Evil flag set', () => {
            expect(service.hasFlag(128, FlagEnum.Evil)).toBeTruthy();
        });

        it('should have Anti Evil flag set', () => {
            expect(service.hasFlag(1, FlagEnum.Antievil)).toBeTruthy();
        });

        it('should have Anti Good flag set', () => {
            expect(service.hasFlag(2, FlagEnum.Antigood)).toBeTruthy();
        });

        it('should have Anti neutral flag set', () => {
            expect(service.hasFlag(4, FlagEnum.Antineutral)).toBeTruthy();
        });

        it('should have Container flag set', () => {
            expect(service.hasFlag(16, FlagEnum.Container)).toBeTruthy();
        });

        it('should have cursed flag set', () => {
            expect(service.hasFlag(32, FlagEnum.Cursed)).toBeTruthy();
        });

        it('should have Equipable flag set', () => {
            expect(service.hasFlag(64, FlagEnum.Equipable)).toBeTruthy();
        });

        it('should have Glow flag set', () => {
            expect(service.hasFlag(256, FlagEnum.Glow)).toBeTruthy();
        });

        it('should have Holy flag set', () => {
            expect(service.hasFlag(512, FlagEnum.Holy)).toBeTruthy();
        });

        it('should have Hum flag set', () => {
            expect(service.hasFlag(1024, FlagEnum.Hum)).toBeTruthy();
        });

        it('should have Invis flag set', () => {
            expect(service.hasFlag(2048, FlagEnum.Invis)).toBeTruthy();
        });

        it('should have No Drop flag set', () => {
            expect(service.hasFlag(4096, FlagEnum.Nodrop)).toBeTruthy();
        });

        it('should have No locate flag set', () => {
            expect(service.hasFlag(8192, FlagEnum.Nolocate)).toBeTruthy();
        });

        it('should have No remove flag set', () => {
            expect(service.hasFlag(16384, FlagEnum.Noremove)).toBeTruthy();
        });

        it('should have quest item flag set', () => {
            expect(service.hasFlag(32768, FlagEnum.QuestItem)).toBeTruthy();
        });

        it('should have Vampric flag set', () => {
            expect(service.hasFlag(65536, FlagEnum.Vampric)).toBeTruthy();
        });

        it('should return false is flag not set', () => {
            expect(service.hasFlag(999, FlagEnum.Vampric)).toBeFalsy();
        });
    });
});
