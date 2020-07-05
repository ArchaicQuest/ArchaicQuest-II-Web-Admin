import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";
import { take, startWith, map } from 'rxjs/operators';
import { EffectLocation } from '../interfaces/effect.interface';
import { StatusEnum } from '../interfaces/status.enum';
import { ItemType } from 'src/app/items/interfaces/item-type.interface';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { SkillType } from '../interfaces/skill-type.interface';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from './add-class.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;
    public attributeLocations: { name: string; value: number }[];
    public skillSpellsList: Skill[] = [];
    public filteredOptions: Observable<Skill[]>;
    public form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        diceRoll: ['1', Validators.required],
        diceMaxSize: ['', Validators.required],
        attributes: this.formBuilder.array([
        ]),
        selectedSkill: [null],
    });
    constructor(
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private service: ClassService,
        private toastr: ToastrService
    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {


        this.attributeLocations = Object.keys(EffectLocation)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: EffectLocation[key], value: index === 0 ? 0 : 1 << index };
            });

        this.service.getSkillsSpells().pipe(take(1)).subscribe(x => this.skillSpellsList = [...x]);


        this.filteredOptions = this.form.get('selectedSkill').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

        setTimeout(() => {
            this.form.get('selectedSkill').setValue(null);
        });
    }

    private _filter(value: string): Skill[] {

        if (value == null) {
            return this.skillSpellsList;
        }


        const filterValue = value.toLowerCase();
        console.log(this.skillSpellsList.filter(x => x.name.toLowerCase().indexOf(filterValue) === 0));
        return this.skillSpellsList.filter(x => x.name.toLowerCase().indexOf(filterValue) === 0);
    }

    get attributes() {
        return this.form.get('attributes') as FormArray;
    }

    initattributes() {
        return this.formBuilder.group({
            attribute: ['', Validators.required],
            value: ['', Validators.required],
        });

    }

    addEffect() {
        const control = <FormArray>this.form.controls['attributes'];
        control.push(this.initattributes());
    }
    removeItem(i: number) {
        const control = <FormArray>this.form.controls['attributes'];
        control.removeAt(i);
    }

    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }


    // addClass() {
    //     const skill: Skill = {
    //         id: -1,
    //         name: this.form.get('name').value,
    //         description: this.form.get('description').value,
    //         damage: {
    //             diceRoll: this.form.get('diceRoll').value,
    //             diceMinSize: 1,
    //             diceMaxSize: this.form.get('diceMaxSize').value
    //         },
    //         cost: {
    //             hitPoints: 0,
    //             moves: 0,
    //             none: 0,
    //             mana: 5
    //         },
    //         effect: null,
    //         rounds: 1,
    //         type: SkillType.Affect
    //     }


    //     this.service.postSkill(skill).pipe(take(1)).subscribe(x => {
    //         console.log("success", x)
    //     })
    // }

}
