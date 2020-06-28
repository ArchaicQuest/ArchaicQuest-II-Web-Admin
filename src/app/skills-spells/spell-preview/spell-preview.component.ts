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
import { FormGroup } from '@angular/forms';
import { SkillSpellService } from '../add-skills-spells/add-skills-spells.service';


@Component({
    selector: 'app-spell-preview-component',
    templateUrl: './spell-preview.component.html',
    styleUrls: ['./spell-preview.component.scss']
})

export class SpellPreviewComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
    @Input() form: FormGroup;
    componentActive = true;

    constructor(private service: SkillSpellService, private _changeRef: ChangeDetectorRef
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

    ngOnChanges(changes: SimpleChanges) {
        this.form = changes['form'].currentValue;

    }



}
