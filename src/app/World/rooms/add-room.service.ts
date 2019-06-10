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

@Injectable({
    providedIn: 'root'
})

export class RoomService {
    private host = `${environment.hostAPI}`;

    private headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    items: BehaviorSubject<Item[]> = new BehaviorSubject([]);
    public addRoomForm = this.formBuilder.group({
        id: [''],
        title: ['', Validators.required],
        description: ['', Validators.required],
        roomObjects: this.formBuilder.array([this.initRoomObject()]),
        updateMessage: [''],
        instantRepop: [false],
        mobs: [],
        CoordX: ['', Validators.required],
        CoordY: ['', Validators.required],
        CoordZ: ['', Validators.required],
        Exits: new FormGroup({}),



    });

    // return this.formBuilder.group({
    //     emote: ''
    // });

    initRoomObject() {
        return this.formBuilder.group({
            title: new FormControl(''),
            description: new FormControl(''),
            examine: new FormControl(''),
            touch: new FormControl(''),
            smell: new FormControl(''),
            taste: new FormControl(''),
        });


    }

    roomItemsUpdate(item: Item) {
console.log("item: ", item);
        const foundIndex = this.items.getValue().findIndex(x => x.id == item.id);

        let newArr = this.items.getValue();
        newArr[foundIndex] = item;


        console.log("item in arr: ", newArr[foundIndex]);
        this.items.next(JSON.parse(JSON.stringify(this.items.getValue())));
        //return item;
    }

    roomItems(item: Item) {
      debugger;
        this.items.next([...this.items.getValue(), item]);

        //return item;
    }

    clearCache() {
        this.items.next([]);
    }
    getRroomItems() {
        console.log(this.items)
    }
    // saveMob(mob: Mob) {
    //     console.log('post this ', mob);
    //     return this.http.post(this.saveMobUrl, JSON.stringify(mob), {
    //         headers: this.headers,
    //         responseType: 'text'
    //     });
    // }


}
