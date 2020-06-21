import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { SkillSpellService } from './add-skills-spells.service';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";
import { take } from 'rxjs/operators';
import { EffectLocation } from '../interfaces/effect.interface';
import { StatusEnum } from '../interfaces/status.enum';
import { ItemType } from 'src/app/items/interfaces/item-type.interface';


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
    public form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        diceRoll: ['', Validators.required],
        diceMinSize: ['', Validators.required],
        diceMaxSize: ['', Validators.required],
        effects: this.formBuilder.array([
            this.initEffect()
        ]),
        usableFromStatus: new FormGroup({}),
        messageStart: this.formBuilder.group({
            toPlayer: ['', Validators.required],
            ToTarget: ['', Validators.required],
            ToRoom: ['', Validators.required],
        }),
        messageEnd: this.formBuilder.group({
            ToPlayer: ['', Validators.required],
            ToTarget: ['', Validators.required],
            ToRoom: ['', Validators.required],
        }),
        messageFailure: this.formBuilder.group({
            ToPlayer: ['', Validators.required],
            ToTarget: ['', Validators.required],
            ToRoom: ['', Validators.required],
        }),
        rounds: ['', Validators.required],
        cost: this.formBuilder.group({
            type: ['', Validators.required],
            value: ['', Validators.required],
        }),
    });
    constructor(
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
        private service: SkillSpellService
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

        console.log(this.statusFlags)

        this.statusFlags.forEach(flag => {
            (this.form.controls['usableFromStatus'] as FormGroup).addControl(
                flag.name,
                new FormControl()
            );
        });


        console.log(this.effectLocations)

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


    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

}
