import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Mob } from '../interfaces/mob.interface';
import { ViewMobService } from './view-mobs.service';
import { DataListComponent } from './node_modules/src/app/shared/components/data-list/data-list.component';
import { Shared } from './node_modules/src/app/shared/shared';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
    templateUrl: './view-mobs.component.html',
    styleUrls: ['./view-mobs.component.scss']
})
export class ViewMobsComponent extends DataListComponent implements OnInit {
    items: Mob[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private viewMobsService: ViewMobService, private toastr: ToastrService,
        public helpers: Shared) {
        super();
    }

    ngOnInit() {

        this.viewMobsService.getMobs().subscribe((items) => {
            this.data = items;
            this.filteredata = this.data;
        });
    }


    applyFilter(filterValue: string) {
        const result = this.data.filter(x => x.title.toLowerCase().includes(filterValue));
        this.filteredata = result;
    }



    delete(array: any[], index: number, id: number) {
        this.viewMobsService.delete(id).pipe(take(1)).subscribe(deleted => {
            if (deleted) {
                this.helpers.removeItem(array, index);
                this.filteredata = [...array];

                this.toastr.success(deleted.toast);
            }
        });
    }

}
