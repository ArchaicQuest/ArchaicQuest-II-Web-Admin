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
import { HelpService } from '../add-help/add-help.service';


@Component({
    selector: 'app-help-preview-component',
    templateUrl: './help-preview.component.html',
    styleUrls: ['./help-preview.component.scss']
})

export class HelpPreviewComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
    @Input() itemForm: FormGroup;
    componentActive = true;

    constructor(private itemService: HelpService, private _changeRef: ChangeDetectorRef
    ) { }


    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.itemForm = null;
        this._changeRef.detach();
    }

    ngDoCheck() {
        if (!this._changeRef['destroyed']) {
            this._changeRef.markForCheck();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.itemForm = changes['itemForm'].currentValue;

    }



}
