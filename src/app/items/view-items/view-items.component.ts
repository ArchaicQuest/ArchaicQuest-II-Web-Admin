import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { ViewItemsService } from './view-items.service';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';

@Component({
    templateUrl: './view-items.component.html',
    styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent extends DataListComponent implements OnInit {
    items: Item[] = [];
    displayedColumns: string[] = ['id', 'name', 'itemType', 'slot', 'weaponType', 'attackType', 'armourType', 'questItem', 'actions'];

    constructor(private viewItemsService: ViewItemsService) {
        super();
    }

    ngOnInit() {

        this.viewItemsService.getItemTypes().subscribe((items) => {
            console.log(items);
            this.data = items;
            this.filteredata = this.data;
        });
    }

    applyFilter(filterValue: string) {
        const result = this.data.filter(x => x.name.toLowerCase().includes(filterValue));
        this.filteredata = result;
    }

}
