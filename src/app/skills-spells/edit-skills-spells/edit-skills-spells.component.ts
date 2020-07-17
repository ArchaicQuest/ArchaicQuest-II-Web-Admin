import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SkillSpellService } from './../add-skills-spells/add-skills-spells.service';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";
import { take, takeUntil } from 'rxjs/operators';
import { EffectLocation } from '../interfaces/effect.interface';
import { StatusEnum } from '../interfaces/status.enum';
import { ItemType } from 'src/app/items/interfaces/item-type.interface';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { SkillType } from '../interfaces/skill-type.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
    templateUrl: './edit-skills-spells.component.html',
    styleUrls: ['./../add-skills-spells/add-skills-spells.component.scss'],
})
export class EditSkillsSpellComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;
    public effectLocations: { name: string; value: number }[];
    public selectedStatusFlags: StatusEnum[] = [];
    public selectedStatus: StatusEnum;
    public statusFlags: ItemType[];
    public selectedValidTargetFlags: validTargets[] = [];
    public selectedValidTarget: validTargets;
    public validTargetFlags: ItemType[];
    public form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        diceRoll: ['', Validators.required],
        diceMaxSize: ['', Validators.required],
        effects: this.formBuilder.array([
        ]),
        usableFromStatus: new FormGroup({}),
        validTargets: new FormGroup({}),
        rounds: ['', Validators.required],
        cost: this.formBuilder.group({
            type: ['', Validators.required],
            value: ['', Validators.required],
        }),
    });
    constructor(
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private service: SkillSpellService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {

        this.effectLocations = Object.keys(EffectLocation)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: EffectLocation[key], value: index === 0 ? 0 : 1 << index };
            });

        this.statusFlags = Object.keys(StatusEnum)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: StatusEnum[key], id: index === 0 ? 0 : 1 << index };
            });

        this.validTargetFlags = Object.keys(validTargets)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                console.log("flag", index, " id ", key)
                return { name: validTargets[key], id: parseInt(key, 10) };
            });

        console.log(this.validTargetFlags)



        console.log(this.statusFlags)

        this.statusFlags.forEach(flag => {
            (this.form.controls['usableFromStatus'] as FormGroup).addControl(
                flag.name,
                new FormControl()
            );
        });


        this.validTargetFlags.forEach(flag => {
            (this.form.controls['validTargets'] as FormGroup).addControl(
                flag.name,
                new FormControl(false)
            );
        });

        console.log(this.effectLocations)

        this.service.getSkill(this.route.snapshot.params['id']).pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(skill => {

            this.form.get('name').setValue(skill.name);
            this.form.get('description').setValue(skill.description);
            this.form.get('diceMaxSize').setValue(skill.damage.diceMaxSize);
            this.form.get('diceRoll').setValue(skill.damage.diceRoll);
            //   this.form.get('effects').setValue(skill.effect);
            // this.form.get('validTargets').setValue(skill.validTargets);

            this.selectedValidTarget = skill.validTargets;
            let validTarget: number;
            let i = 0;
            while (validTargets[validTarget = 1 << i++]) {
                if (this.selectedValidTarget & validTarget) {
                    this.selectedValidTargetFlags.push(validTarget)
                }
            }


            this.validTargetFlags.forEach(flag => {
                if (this.hasValidTarget(flag.id)) {
                    this.updateSelectedStatus(flag.id);
                }
            });




        });

    }

    get effects() {
        return this.form.get('effects') as FormArray;
    }

    initEffect() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            duration: ['', Validators.required],
            modifier: ['', Validators.required],
            accumulate: ['', Validators.required],
            location: ['', Validators.required],
        });

    }

    //Effects

    addEffect() {
        const control = <FormArray>this.form.controls['effects'];
        control.push(this.initEffect());
    }
    removeItem(i: number) {
        const control = <FormArray>this.form.controls['effects'];
        control.removeAt(i);
    }

    // Stats
    get getStatusControl(): FormArray {
        return this.form.get('usableFromStatus') as FormArray;
    }

    addStatus() {
        this.getStatusControl.push(this.formBuilder.control(''));
    }

    hasStatus(flag: number): boolean {
        return this.service.hasFlag(flag, this.selectedStatus);
    }

    isStatusSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }

    updateSelectedStatus(flag: number) {

        if (this.selectedStatusFlags.length && this.selectedStatusFlags.includes(flag)) {
            this.selectedStatusFlags = this.selectedStatusFlags.filter(flagToRemove => flagToRemove !== flag);
        } else {
            this.selectedStatusFlags.push(flag);
        }

        console.log(this.selectedStatusFlags);
    }

    //valid targets


    get getValidTargetControl(): FormArray {
        return this.form.get('validTargets') as FormArray;
    }

    addValidTarget() {
        this.getValidTargetControl.push(this.formBuilder.control(''));
    }

    hasValidTarget(flag: number): boolean {
        return this.service.hasValidTargetFlag(flag, this.selectedValidTarget);
    }

    isValidTargetSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }

    updateSelectedValidTarget(flag: number) {

        debugger;
        if (this.selectedValidTargetFlags.includes(flag)) {
            this.selectedValidTargetFlags = this.selectedValidTargetFlags.filter(flagToRemove => flagToRemove !== flag);
        } else {
            this.selectedValidTargetFlags.push(flag);
        }

        console.log("vf", this.selectedValidTargetFlags);
    }


    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    addSpell() {
        console.log("got flags", this.selectedValidTargetFlags)
        const targetFlags = this.selectedValidTargetFlags.reduce((a, b) => a + b, 0);
        const skill: Skill = {
            id: this.route.snapshot.params['id'],
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            damage: {
                diceRoll: this.form.get('diceRoll').value,
                diceMinSize: 1,
                diceMaxSize: this.form.get('diceMaxSize').value
            },
            validTargets: targetFlags,
            cost: {
                hitPoints: 0,
                moves: 0,
                none: 0,
                mana: 5
            },
            effect: null,
            rounds: 1,
            type: SkillType.Affect
        }


        this.service.postSkill(skill).pipe(take(1)).subscribe(x => {
            console.log("success", x)
        })
    }

}
