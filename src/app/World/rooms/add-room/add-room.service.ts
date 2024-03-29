import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/items/interfaces/item.interface';
import { BehaviorSubject } from 'rxjs';
import { Mob } from 'src/app/mobs/interfaces/mob.interface';
import { Room } from '../interfaces/room.interface';
import { tap, catchError, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RoomObject } from '../interfaces/roomObject.interface';
import { RoomFlagEnum } from 'src/app/items/interfaces/flags.enums';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private host = `${environment.hostAPI}`;
    private saveRoomUrl = `${this.host}World/Room/`;
    private validExitUrl = `${this.host}World/Room/`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder, private toast: ToastrService) { }

    items: BehaviorSubject<Item[]> = new BehaviorSubject([]);
    mobs: BehaviorSubject<Mob[]> = new BehaviorSubject([]);
    public addRoomForm = this.formBuilder.group({
        id: [''],
        title: ['', Validators.required],
        description: ['', Validators.required],
        roomObjects: this.formBuilder.array([this.initRoomObject(null)]),
        updateMessage: [''],
        instantRepop: [false],
        terrain: [''],
        mobs: [],
        CoordX: ['', Validators.required],
        CoordY: ['', Validators.required],
        CoordZ: ['', Validators.required],
        emotes: this.formBuilder.array([this.initEmote()]),
        exits: this.formBuilder.group({
            north: [''],
            northEast: [''],
            east: [''],
            southEast: [''],
            south: [''],
            southWest: [''],
            west: [''],
            northWest: [''],
            up: [''],
            down: ['']
        }),
        type: [0],
        terrainType: [0],
        flags: new FormGroup({}),
    });


    hasFlag(flag: number, selectedFlag: RoomFlagEnum): boolean {

        if (flag === RoomFlagEnum.Donation && this.isFlagSet(selectedFlag, RoomFlagEnum.Donation)) {
            return true;
        } else if (flag === RoomFlagEnum.Healing && this.isFlagSet(selectedFlag, RoomFlagEnum.Healing)) {
            return true;
        }

        return false;
    }

    private isFlagSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }


    initEmote(data: string = '') {
        return this.formBuilder.group({
            emote: data
        });
    }

    initRoomObject(roomObj: RoomObject) {
        if (roomObj == null) {
            return this.formBuilder.group({
                name: new FormControl(''),
                look: new FormControl(''),
                examine: new FormControl(''),
                touch: new FormControl(''),
                smell: new FormControl(''),
                taste: new FormControl('')
            });
        }

        return this.formBuilder.group({
            name: new FormControl(roomObj.name),
            look: new FormControl(roomObj.look),
            examine: new FormControl(roomObj.examine),
            touch: new FormControl(roomObj.touch),
            smell: new FormControl(roomObj.smell),
            taste: new FormControl(roomObj.taste)
        });

    }

    roomItemsUpdate(item: Item) {
        console.log('item: ', item);
        const foundIndex = this.items.getValue().findIndex(x => x.id === item.id);

        const newArr = this.items.getValue();
        newArr[foundIndex] = item;

        console.log('item in arr: ', newArr[foundIndex]);
        this.items.next(JSON.parse(JSON.stringify(this.items.getValue())));
        // return item;
    }

    roomItems(item: Item) {
        this.items.next([...this.items.getValue(), item]);

        // return item;
    }

    clearCache() {
        this.items.next([]);
        this.mobs.next([]);
        this.addRoomForm.reset();
        this.addRoomForm.get('exits.northWest').setValue('');
        this.addRoomForm.get('exits.north').setValue('');
        this.addRoomForm.get('exits.northEast').setValue('');
        this.addRoomForm.get('exits.west').setValue('');
        this.addRoomForm.get('exits.east').setValue('');
        this.addRoomForm.get('exits.southWest').setValue('');
        this.addRoomForm.get('exits.south').setValue('');
        this.addRoomForm.get('exits.southEast').setValue('');
        this.addRoomForm.get('exits.up').setValue('');
        this.addRoomForm.get('exits.down').setValue('');

        this.addRoomForm = this.formBuilder.group({
            id: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
            roomObjects: this.formBuilder.array([this.initRoomObject(null)]),
            updateMessage: [''],
            instantRepop: [false],
            terrain: [''],
            mobs: [],
            CoordX: ['', Validators.required],
            CoordY: ['', Validators.required],
            CoordZ: ['', Validators.required],
            emotes: this.formBuilder.array([this.initEmote()]),
            exits: this.formBuilder.group({
                north: [''],
                northEast: [''],
                east: [''],
                southEast: [''],
                south: [''],
                southWest: [''],
                west: [''],
                northWest: [''],
                up: [''],
                down: ['']
            }),
            type: [0],
            terrainType: [0]
        });

    }
    getRroomItems() {
        console.log(this.items);
    }

    updateMobInventory(item: Item, mob: Item | Mob) {
        const foundIndex = this.mobs.getValue().findIndex(x => x.id === mob.id);

        const newArr = this.mobs.getValue();
        newArr[foundIndex].inventory.push(item);

        this.mobs.next(JSON.parse(JSON.stringify(this.mobs.getValue())));
    }

    roomMobs(mob: Mob) {

        this.mobs.next([...this.mobs.getValue(), mob]);
    }

    saveRoom(data: Room) {
        return this.http
            .post(this.saveRoomUrl, JSON.stringify(data), {
                headers: this.headers,
                responseType: 'text'
            })
            .pipe(tap(x => console.log(x)))
            .subscribe(response => {
                this.toast.success(`Room ${data.title} saved successfully.`);
            });
    }
    updateRoom(data: Room, roomId: number) {

        console.log("dd", JSON.stringify(data));
        return this.http
            .put(`${this.saveRoomUrl}${data.id}`, JSON.stringify(data), {
                headers: this.headers,
                responseType: 'text'
            })
            .pipe(take(1))
            .pipe(tap(x => console.log(x)))
            .subscribe(response => {
                window.location.href = `/world/area/${roomId}?saved=Room ${data.title} saved successfully.`
            });
    }

    isValidExit(x: number, y: number, z: number, areaId: number) {
        return this.http
            .get(`${this.validExitUrl}${x}/${y}/${z}/${areaId}`, {
                headers: this.headers,
                responseType: 'text'
            });

    }

    removeExit(exit: string) {
        this.addRoomForm.get('exits.north').setValue('');
    }

    getRoomFlags() {
        return this.http.get(`${this.host}World/Room/ReturnFlagTypes`, {
            headers: this.headers,
        });
    }
}
