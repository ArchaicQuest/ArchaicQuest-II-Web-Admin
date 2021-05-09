import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SkillSpellService } from './add-skills-spells.service';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";
import { take } from 'rxjs/operators';
import { EffectLocation, SkillEffectLocation } from '../interfaces/effect.interface';
import { StatusEnum } from '../interfaces/status.enum';
import { ItemType } from 'src/app/items/interfaces/item-type.interface';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { SkillType } from '../interfaces/skill-type.interface';
import { ToastrService } from 'ngx-toastr';
import { CodeModel } from '@ngstack/code-editor';


@Component({
    templateUrl: './add-skills-spells.component.html',
    styleUrls: ['./add-skills-spells.component.scss'],
})
export class AddSkillsSpellComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;
    public effectLocations: { name: string; value: number }[];
    public selectedStatusFlags: StatusEnum[] = [];
    public selectedStatus: StatusEnum;
    public statusFlags: ItemType[];
    public selectedValidTargetFlags: validTargets[] = [];
    public selectedValidTarget: validTargets;
    public validTargetFlags: ItemType[];
    public selectedSkillTypeFlags: SkillType[] = [];
    public selectedSkillType: SkillType;
    public skillTypeFlags: ItemType[];
    public isAttackingSkill: boolean;
    public form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        diceRoll: ['', Validators.required],
        diceMaxSize: ['', Validators.required],
        effects: this.formBuilder.array([
        ]),
        usableFromStatus: new FormGroup({}),
        validTargets: new FormGroup({}),
        skillTypes: new FormGroup({}),
        rounds: ['', Validators.required],
        savingThrow: [''],
        skillHitToPlayerMsg: [''],
        skillHitToRoomMsg: [''],
        skillHitToTargetMsg: [''],
        skillMissToPlayerMsg: [''],
        skillMissToRoomMsg: [''],
        skillMissToTargetMsg: [''],
        skillDeathToPlayerMsg: [''],
        skillDeathToRoomMsg: [''],
        skillDeathToTargetMsg: [''],
        cost: this.formBuilder.group({
            hp: [''],
            mana: [''],
            moves: [''],
        }),
        formula: ['']
    });
    formulaModel: CodeModel = {
        language: 'lua',
        uri: 'lua.json',
        value: '',
    };


    options = {
        contextmenu: true,
        minimap: {
            enabled: false,
        },
    };
    theme = 'vs-dark';
    constructor(
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private service: SkillSpellService,
        private toastr: ToastrService
    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    formulaChanged(value) {
        this.form.get('formula').setValue(value);
    }
    compareFn(x: any, y: any): boolean {
        return x && y ? x === y : x === y;
    }
    ngOnInit() {

        this.effectLocations = Object.keys(SkillEffectLocation)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                console.log("index", index)
                return { name: SkillEffectLocation[key], value: parseInt(key, 10) };
            });

        this.statusFlags = Object.keys(StatusEnum)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: StatusEnum[key], id: index === 0 ? 0 : 1 << index };
            });

        this.validTargetFlags = Object.keys(validTargets)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: validTargets[key], id: parseInt(key, 10) };
            });


        this.skillTypeFlags = Object.keys(SkillType)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                console.log("flag", index, " id ", SkillType[key])
                return { name: SkillType[key], id: parseInt(key, 10) };
            });


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
                new FormControl()
            );
        });


        this.skillTypeFlags.forEach(flag => {
            (this.form.controls['skillTypes'] as FormGroup).addControl(
                flag.name,
                new FormControl(false)
            );
        });

        console.log(this.effectLocations)

    }

    get effects() {
        return this.form.get('effects') as FormArray;
    }

    initEffect() {
        return this.formBuilder.group({
            name: [''],
            duration: ['', Validators.required],
            modifier: [''],
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

        if (this.selectedValidTargetFlags.length && this.selectedValidTargetFlags.includes(flag)) {
            this.selectedValidTargetFlags = this.selectedValidTargetFlags.filter(flagToRemove => flagToRemove !== flag);
        } else {
            this.selectedValidTargetFlags.push(flag);
        }

        console.log("vf", this.selectedValidTargetFlags);
    }


    // skill types

    get getSkillTypeControl(): FormArray {
        return this.form.get('validTargets') as FormArray;
    }

    addSkillType() {
        this.getSkillTypeControl.push(this.formBuilder.control(''));
    }

    hasSkillType(flag: number): boolean {
        return this.service.hasSkillTypeFlag(flag, this.selectedSkillType);
    }

    isSkillTypeSet(value: number, flag: number): boolean {
        return (value & flag) !== 0;
    }

    updateSelectedSkillType(flag: number) {

        if (this.selectedSkillTypeFlags.includes(flag)) {
            if (flag == 32) {
                this.isAttackingSkill = false;
            }
            this.selectedSkillTypeFlags = this.selectedSkillTypeFlags.filter(flagToRemove => flagToRemove !== flag);
        } else {
            this.selectedSkillTypeFlags.push(flag);
            if (flag == 32) {
                this.isAttackingSkill = true;
            }
        }

        console.log("stf", this.selectedSkillTypeFlags);
    }



    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    addSpell() {
        const targetFlags = this.selectedValidTargetFlags.reduce((a, b) => a + b, 0);
        const selectedTypeFlags = this.selectedSkillTypeFlags.reduce((a, b) => a + b, 0);

        this.form.get("effects").value.forEach(x => {
            console.log(x)
        });


        const skill: Skill = {
            id: -1,
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            formula: "",
            damage: {
                diceRoll: this.form.get('diceRoll').value,
                diceMinSize: 1,
                diceMaxSize: this.form.get('diceMaxSize').value
            },
            validTargets: targetFlags,
            cost: {
                table: {
                    hitPoints: this.form.get('cost').get('hp').value,
                    moves: this.form.get('cost').get('moves').value,
                    none: 0,
                    mana: this.form.get('cost').get('mana').value,
                }
            },
            spellAffects: this.form.get("effects").value, // loop and set correctly
            rounds: 1,
            type: selectedTypeFlags,
            skillMessage: {
                death: {
                    toPlayer: this.form.get("skillDeathToPlayerMsg").value,
                    toRoom: this.form.get("skillDeathToRoomMsg").value,
                    toTarget: this.form.get("skillDeathToTargetMsg").value,
                },
                hit: {
                    toPlayer: this.form.get("skillHitToPlayerMsg").value,
                    toRoom: this.form.get("skillHitToRoomMsg").value,
                    toTarget: this.form.get("skillHitToTargetMsg").value,
                },
                miss: {
                    toPlayer: this.form.get("skillMissToPlayerMsg").value,
                    toRoom: this.form.get("skillMissToRoomMsg").value,
                    toTarget: this.form.get("skillMissToTargetMsg").value,
                }
            },
            startsCombat: true,
            savingThrow: {
                mental: this.form.get("savingThrow").value === 'Mental' ? true : false,
                reflex: this.form.get("savingThrow").value === 'Reflex' ? true : false,
                strength: this.form.get("savingThrow").value === 'Fortitude' ? true : false,
            }
        }


        this.service.postSkill(skill).pipe(take(1)).subscribe(x => {
            console.log("success", x)
        })
    }

}
