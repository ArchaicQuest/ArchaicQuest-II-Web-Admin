import { Component, OnInit, ViewChild, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ItemService } from './add-skills-spells.service';
import { ActivatedRoute } from '@angular/router';
import { componentDestroyed, OnDestroyMixin } from "@w11k/ngx-componentdestroyed";


@Component({
    templateUrl: './add-skills-spells.component.html',
    styleUrls: ['./add-skills-spells.component.scss'],
})
export class AddSkillsSpellComponent extends OnDestroyMixin implements OnDestroy, OnInit {
    componentActive = true;

    constructor(

    ) { super(); }
    @ViewChild('autosize')
    autosize: CdkTextareaAutosize;

    ngOnInit() {




    }

}
