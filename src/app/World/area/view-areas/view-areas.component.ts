import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Area } from '../interface/area.interface';
import { ViewAreasService } from './view-areas.service';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';

@Component({
    templateUrl: './view-areas.component.html',
    styleUrls: ['./view-areas.component.scss']
})
export class ViewAreasComponent extends DataListComponent implements OnInit {
    areas: Area[] = [];

    constructor(private service: ViewAreasService) {
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

}
