import {
    Component,
    OnInit,
    OnDestroy,
    Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-item-preview-component',
    templateUrl: './item-preview.component.html',
    styleUrls: ['./item-preview.component.scss']
})

export class ItemPreviewComponent implements OnInit, OnDestroy {
    @Input() addItemForm: FormGroup;
    componentActive = true;

    constructor(
    ) { }


    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

}
