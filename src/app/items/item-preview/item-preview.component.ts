import {
    Component,
    OnInit,
    OnDestroy,
    Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemService } from '../add-item/add-item.service';


@Component({
    selector: 'app-item-preview-component',
    templateUrl: './item-preview.component.html',
    styleUrls: ['./item-preview.component.scss']
})

export class ItemPreviewComponent implements OnInit, OnDestroy {
    @Input() addItemForm: FormGroup;
    componentActive = true;

    constructor(private itemService: ItemService,
    ) { }


    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    calculateAverageDamage(min = 1, max = 1) {
        return this.itemService.averageDamage(min, max);
    }

}
