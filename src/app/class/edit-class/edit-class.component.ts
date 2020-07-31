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
import { Shared } from 'src/app/shared/shared';

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
        private route: ActivatedRoute,
        private helpers: Shared,
        private changeDetectorRef: ChangeDetectorRef
    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {


        this.attributeLocations = Object.keys(EffectLocation)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: EffectLocation[key], value: parseInt(key, 10) };
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
                    if (skill.skillName != null) {
                        this.addSkill(skill.level, skill.skillName, skill.skillId);
                    }
                });


                for (const key of Object.keys(x.attributeBonus.attribute)) {
                    if (x.attributeBonus.attribute[key] > 0) {
                        this.addEffect(EffectLocation[key], x.attributeBonus.attribute[key]);
                    }
                }
                this.changeDetectorRef.detectChanges();
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

    initattributes(location: any = '', value: string = '') {

        console.log(location, value)
        return this.formBuilder.group({
            attribute: [location, Validators.required],
            value: [value, Validators.required],
        });

    }

    addEffect(location: any = '', value: string = '') {
        const control = <FormArray>this.form.controls['attributes'];
        control.push(this.initattributes(location, value));
    }
    removeItem(i: number) {
        const control = <FormArray>this.form.controls['attributes'];
        control.removeAt(i);
    }

    removeSpell(i: number) {
        this.helpers.removeItem(this.classSkillsList, i);
        this.classSkillsList = [...this.classSkillsList];
    }
    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    addSkill(level?: number, name?: string, skillId?: number) {
        //   debugger;
        const newSkill = [
            {
                skillId: skillId,
                level: level || this.form.get('selectedSkillLevel').value,
                skill: name || this.form.get('selectedSkill').value
            }];
        this.classSkillsList = this.classSkillsList.concat(...newSkill);
        this.classSkillsList.sort((a, b) => a.level - b.level);
    }


    addClass() {

        let skillList: SkillList[] = [];

        this.classSkillsList.forEach(skill => {

            debugger;
            skillList.push({
                skillId: skill.skill.id,
                level: skill.level,
                skillName: skill.skill.name || (skill.skill as unknown as string),

            });
        });
        const data: Class = {
            id: this.route.snapshot.params['id'],
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            attributeBonus: {
                attribute: {
                    'strength': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Strength),
                    'dexterity': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Dexterity),
                    'constitution': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Constitution),
                    'wisdom': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Wisdom),
                    'intelligence': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Intelligence),
                    'charisma': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Charisma),
                    'hitpoints': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Hitpoints),
                    'mana': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Mana),
                    'moves': this.service.getEffectValue((this.form.get('attributes') as FormArray), EffectLocation.Moves),
                }
            },
            skills: skillList,
            hitDice: {
                diceMinSize: 1,
                diceRoll: 1,
                diceMaxSize: this.form.get('diceMaxSize').value,
            }
        }


        this.service.postClass(data).pipe(take(1)).subscribe(x => {
            console.log("success", x)
        })
    }

}
