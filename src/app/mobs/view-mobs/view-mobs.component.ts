import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


import { Mob } from '../interfaces/mob.interface';
import { ViewMobService } from './view-mobs.service';

@Component({
    templateUrl: './view-mobs.component.html',
    styleUrls: ['./view-mobs.component.scss']
})
export class ViewMobsComponent implements OnInit {
    items: Mob[] = [];
    displayedColumns: string[] = ['name', 'level', 'description', 'actions'];
    dataSource: MatTableDataSource<Mob>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private viewMobsService: ViewMobService) {

    }

    ngOnInit() {

        this.viewMobsService.getMobs().subscribe((items) => {
            this.items = items;
            console.log(items)
            this.dataSource = new MatTableDataSource(this.items);
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
