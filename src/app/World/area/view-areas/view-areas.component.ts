import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Area } from '../interface/area.interface';
import { ViewAreasService } from './view-areas.service';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';

@Component({
    templateUrl: './view-areas.component.html',
    styleUrls: ['./view-areas.component.scss']
})
export class ViewAreasComponent extends DataListComponent implements OnInit {
    areas: Area[] = [];

    constructor(private service: ViewAreasService,
        private helpers: Shared) {
        super();
    }

    ngOnInit() {

        this.service.getItemTypes().subscribe((data) => {
            this.data = data;
            this.filteredata = this.data;
        });

    }

    applyFilter(filterValue: string) {
        const result = this.data.filter(x => x.title.toLowerCase().includes(filterValue));
        this.filteredata = result;
    }

    removeArea(index: number) {
        var areaToDelete = (this.helpers.removeItem(this.filteredata, index) as Area[]);
        this.filteredata = [...this.filteredata];

        this.service.delete(areaToDelete[0].id);
    }

}
