import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Area } from '../interface/area.interface';
import { ViewAreasService } from './view-areas.service';

@Component({
    templateUrl: './view-areas.component.html',
    styleUrls: ['./view-areas.component.scss']
})
export class ViewAreasComponent implements OnInit {
    areas: Area[] = [];
    displayedColumns: string[] = ['title', 'description', 'rooms', 'dateUpdated', 'actions'];
    dataSource: MatTableDataSource<Area>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private service: ViewAreasService) {

    }

    ngOnInit() {

        this.service.getItemTypes().subscribe((data) => {
            this.areas = data;
            console.log(data);
            this.dataSource = new MatTableDataSource(this.areas);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
