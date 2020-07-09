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


@Component({
    selector: 'app-class-preview-component',
    templateUrl: './class-preview.component.html',
    styleUrls: ['./class-preview.component.scss']
})

export class ClassPreviewComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
    @Input() form: FormGroup;
    @Input() attributes: FormArray;
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

    ngOnChanges(changes: SimpleChanges) {
        this.form = changes['form'].currentValue;

    }



}
