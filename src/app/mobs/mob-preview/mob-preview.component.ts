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


@Component({
    selector: 'app-mob-preview-component',
    templateUrl: './mob-preview.component.html',
    styleUrls: ['./mob-preview.component.scss']
})

export class MobPreviewComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
    @Input() mobForm: FormGroup;
    componentActive = true;

    constructor(private _changeRef: ChangeDetectorRef
    ) { }


    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.mobForm = null;
        this._changeRef.detach();
    }

    ngDoCheck() {
        if (!this._changeRef['destroyed']) {
            this._changeRef.markForCheck();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.mobForm = changes['mobForm'].currentValue;

    }



}
