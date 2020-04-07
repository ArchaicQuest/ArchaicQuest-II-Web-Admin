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
import { ItemService } from '../add-item/add-item.service';


@Component({
    selector: 'app-item-preview-component',
    templateUrl: './item-preview.component.html',
    styleUrls: ['./item-preview.component.scss']
})

export class ItemPreviewComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
    @Input() itemForm: FormGroup;
    componentActive = true;

    constructor(private itemService: ItemService, private _changeRef: ChangeDetectorRef
    ) { }


    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    ngDoCheck() {
        this._changeRef.markForCheck();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log("form", changes['itemForm'].currentValue)
        this.itemForm = changes['itemForm'].currentValue;

    }



}
