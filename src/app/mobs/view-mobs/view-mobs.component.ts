import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


import { Mob } from '../interfaces/mob.interface';
import { ViewMobService } from './view-mobs.service';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
    templateUrl: './view-mobs.component.html',
    styleUrls: ['./view-mobs.component.scss']
})
export class ViewMobsComponent extends DataListComponent implements OnInit {
    items: Mob[] = [];
    displayedColumns: string[] = ['name', 'level', 'description', 'actions'];
    dataSource: MatTableDataSource<Mob>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
