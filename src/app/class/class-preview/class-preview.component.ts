import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    ChangeDetectorRef,
    DoCheck,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Skill } from 'src/app/skills-spells/interfaces/skill.interface';


@Component({
    selector: 'app-class-preview-component',
    templateUrl: './class-preview.component.html',
    styleUrls: ['./class-preview.component.scss']
})

export class ClassPreviewComponent implements OnInit, OnDestroy, DoCheck {
    @Input() form: FormGroup;
    @Input() attributes: FormArray;
    @Input() classSkillsList: { level: number, skill: Skill }[];
    componentActive = true;

    constructor(private _changeRef: ChangeDetectorRef
    ) { }


    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.form = null;
        this._changeRef.detach();
    }

    ngDoCheck() {
        if (!this._changeRef['destroyed']) {
            this._changeRef.markForCheck();
        }
    }





}
