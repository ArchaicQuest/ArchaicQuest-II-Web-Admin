import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ItemService } from './add-skills-spells.service';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";
import { take } from 'rxjs/operators';
import { EffectLocation } from '../interfaces/effect.interface';


@Component({
    templateUrl: './add-skills-spells.component.html',
    styleUrls: ['./add-skills-spells.component.scss'],
})
export class AddSkillsSpellComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;
    public effectLocations: { name: string; value: number }[];
    public form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        diceRoll: ['', Validators.required],
        diceMinSize: ['', Validators.required],
        diceMaxSize: ['', Validators.required],
        effects: this.formBuilder.array([
            this.initEffect()
        ])
    });
    constructor(
        private formBuilder: FormBuilder,
        private ngZone: NgZone,
    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {

        this.effectLocations = Object.keys(EffectLocation)
            .filter(value => isNaN(Number(value)) === false)
            .map((key, index) => {
                return { name: EffectLocation[key], value: index === 0 ? 0 : 1 << index };
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

    addEffect() {
        const control = <FormArray>this.form.controls['effects'];
        control.push(this.initEffect());
    }
    removeItem(i: number) {
        const control = <FormArray>this.form.controls['effects'];
        control.removeAt(i);
    }


    triggerDescriptionResize() {
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

}
