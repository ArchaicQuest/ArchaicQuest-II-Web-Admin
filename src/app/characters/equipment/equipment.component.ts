import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/items/add-item/add-item.service';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
})
export class InventoryComponent implements OnInit {
    headItems: Item[] = [];
    public formGroup = this.formBuilder.group({
      headEq: [''],
    });
    constructor(
        private itemService: ItemService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
      
    }


}
