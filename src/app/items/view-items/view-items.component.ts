import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { ViewItemsService } from './view-items.service';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Shared } from 'src/app/shared/shared';

@Component({
    templateUrl: './view-items.component.html',
    styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent extends DataListComponent implements OnInit {
    items: Item[] = [];
    displayedColumns: string[] = ['id', 'name', 'itemType', 'slot', 'weaponType', 'attackType', 'armourType', 'questItem', 'actions'];

    constructor(private viewItemsService: ViewItemsService, private toastr: ToastrService,
        public helpers: Shared) {
        super();
    }

    ngOnInit() {

        this.viewItemsService.getItemTypes().subscribe((items) => {

            this.data = items;
            this.filteredata = this.data;
        });
    }

    applyFilter(filterValue: string) {
        const result = this.data.filter(x => x.name.toLowerCase().includes(filterValue));
        this.filteredata = result;
    }

    delete(array: any[], index: number, id: number) {
        this.viewItemsService.deleteItem(id).pipe(take(1)).subscribe(deleted => {
            if (deleted) {
                this.helpers.removeItem(array, index);
                this.filteredata = [...array];

                this.toastr.success(deleted.toast);
            }
        });
    }

}
