import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";
import { take, startWith, map, takeUntil } from 'rxjs/operators';
import { EffectLocation } from '../interfaces/effect.interface';
import { StatusEnum } from '../interfaces/status.enum';
import { ItemType } from 'src/app/items/interfaces/item-type.interface';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { SkillType } from '../interfaces/skill-type.interface';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../add-class/add-class.service';
import { Observable } from 'rxjs';
import { Class, SkillList } from 'src/app/characters/interfaces/class.interface';

@Component({
    templateUrl: './edit-class.component.html',
    styleUrls: ['./edit-class.component.scss'],
})
export class EditClassComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;
    public attributeLocations: { name: string; value: number }[];
    public skillSpellsList: Skill[] = [];
    public filteredOptions: Observable<Skill[]>;
    public classSkillsList: { level: number, skill: Skill }[] = [];
    public form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        diceRoll: ['1', Validators.required],
        diceMaxSize: ['', Validators.required],
        attributes: this.formBuilder.array([
        ]),
        selectedSkill: [null],
        selectedSkillLevel: [''],
    });
    constructor(
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private service: ClassService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {


        this.attributeLocations = Object.keys(EffectLocation)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: EffectLocation[key], value: index === 0 ? 0 : 1 << index };
            });

        this.service.getSkillsSpells().pipe(take(1)).subscribe(x => {
            this.skillSpellsList = [...x]
            this.filteredOptions = this.form.get('selectedSkill').valueChanges.pipe(
                startWith(''),
                map(value => value ? this._filter(value) : this.skillSpellsList)
            );
        });


        this.service.getClass(this.route.snapshot.params['id']).pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe({
            next: (x: Class) => {

                console.log("class:", x)

                this.form.get('name').setValue(x.name);
                this.form.get('description').setValue(x.description);
                this.form.get('diceMaxSize').setValue(x.hitDice.diceMaxSize);
                this.form.get('diceRoll').setValue(x.hitDice.diceRoll);

                x.skills.forEach(skill => {

                    this.addSkill(skill.level, skill.skillName);
                });

                //  this.form.get('effects').setValue(x.skills);
                // // this.form.get('validTargets').setValue(skill.validTargets);

                // this.selectedValidTarget = skill.validTargets;
                // let validTarget: number;
                // let i = 0;
                // while (validTargets[validTarget = 1 << i++]) {
                //     if (this.selectedValidTarget & validTarget) {
                //         this.selectedValidTargetFlags.push(validTarget)
                //     }
                // }


                // this.validTargetFlags.forEach(flag => {
                //     if (this.hasValidTarget(flag.id)) {
                //         this.updateSelectedStatus(flag.id);
                //     }
                // });


            }
        });


    }

    displayFn(skill: Skill): string {
        return skill && skill.name ? skill.name : '';
    }

    private _filter(value: string): Skill[] {

        if (value == null) {
            return this.skillSpellsList;
        }

        const filterValue = value.toLowerCase();

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

    addSkill(level?: number, name?: string) {
        //   debugger;
        const newSkill = [{ level: level || this.form.get('selectedSkillLevel').value, skill: name || this.form.get('selectedSkill').value }];
        this.classSkillsList = this.classSkillsList.concat(...newSkill);
        this.classSkillsList.sort((a, b) => a.level - b.level);
    }


    addClass() {

        let skillList: SkillList[] = [];

        this.classSkillsList.forEach(skill => {
            skillList.push({
                skillId: skill.skill.id,
                level: skill.level,
                skillName: skill.skill.name
            });
        });
        const data: Class = {
            id: -1,
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            skills: skillList
        }


        this.service.postClass(data).pipe(take(1)).subscribe(x => {
            console.log("success", x)
        })
    }

}
