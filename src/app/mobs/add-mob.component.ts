import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MobService } from './add-mob.service';
import { ActivatedRoute } from '@angular/router';
import { Gender } from '../characters/interfaces/gender.interface';
import { MatSelectChange } from '@angular/material';
import { Race } from '../characters/interfaces/race.interface';
import { Class } from '../characters/interfaces/class.interface';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take, startWith, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Alignment } from '../characters/interfaces/alignment.interface';
import { Item } from '../items/interfaces/item.interface';
import { Observable, throwError } from 'rxjs';
import { ItemService } from '../items/add-item/add-item.service';
import { Store } from '@ngrx/store';
import { Mob } from './interfaces/mob.interface';
import { CharacterAppState } from '../characters/state/character.state';
import { SaveChar } from '../characters/state/character.actions';


@Component({
    templateUrl: './add-mob.component.html',
})
export class AddMobComponent implements OnInit {
    addMobForm: FormGroup;
    races: Race[];
    classes: Class[];
    genders: Gender[];
    alignments: Alignment[];
    inventoryItems: Item[] = [];
    filteredItems: Observable<Item[]>;
    constructor(
        private mobService: MobService,
        private store: Store<CharacterAppState>,
        private route: ActivatedRoute,
        private ngZone: NgZone
    ) { }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    ngOnInit() {
        this.addMobForm = this.mobService.getAddMobForm();
        this.genders = this.mobService.getGender();
        this.races = this.mobService.getRaces();
        this.classes = this.mobService.getClasses();
        this.alignments = this.mobService.getAlignment();

    }


    triggerDescriptionResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    selectGender(data: MatSelectChange) {
        console.log('gender', data.value);
    }

    selectRace(data: MatSelectChange) {
        console.log('race', data.value);
    }

    selectClass(data: MatSelectChange) {
        console.log('class', data.value);
    }

    selectAlignment(data: MatSelectChange) {
        console.log('alignment', data.value);
    }

    addMob() {

        //todo inventory and EQ

        const mob: Mob = {
            id: -1,
            alignmentScore: 0,
            armorRating: {
                armour: 0,
                magic: 0
            },
            attributes: this.addMobForm.get('attributes').value,
            maxAttributes: this.addMobForm.get('attributes').value,
            className: this.addMobForm.get('class').value,
            description: this.addMobForm.get('description').value,
            gender: this.addMobForm.get('gender').value,
            level: this.addMobForm.get('level').value,
            stats: this.addMobForm.get('stats').value,
            maxStats: this.addMobForm.get('stats').value,
            money: { gold: 0, copper: 0, silver: 0 },
            name: this.addMobForm.get('name').value,
            race: this.addMobForm.get('race').value,
        };
        console.log(mob)
        this.store.dispatch(new SaveChar(mob));
    }

}
