import { Component, OnInit } from '@angular/core';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Shared } from 'src/app/shared/shared';
import { Help } from '../interfaces/help.interface';
import { ViewHelpService } from './view-help.service';

@Component({
    templateUrl: './view-help.component.html',
    styleUrls: ['./view-help.component.scss']
})
export class ViewHelpComponent extends DataListComponent implements OnInit {
    items: Help[] = [];
    displayedColumns: string[] = ['id', 'name', 'actions'];

    constructor(private viewItemsService: ViewHelpService, private toastr: ToastrService,
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
