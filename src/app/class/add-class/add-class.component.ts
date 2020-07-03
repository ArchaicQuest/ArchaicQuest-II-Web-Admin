import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";
import { take } from 'rxjs/operators';
import { EffectLocation } from '../interfaces/effect.interface';
import { StatusEnum } from '../interfaces/status.enum';
import { ItemType } from 'src/app/items/interfaces/item-type.interface';
import { validTargets } from '../interfaces/targets.enum';
import { Skill } from '../interfaces/skill.interface';
import { SkillType } from '../interfaces/skill-type.interface';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from './add-class.service';


@Component({
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;

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
        private service: ClassService,
        private toastr: ToastrService
    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {



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
