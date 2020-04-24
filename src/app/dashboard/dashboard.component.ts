import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns: string[] = ['name', 'race', 'class', 'level', 'actions'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() {

    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource([{
            name: "liam",
            class: "Mage",
            race: "Elf",
            level: 30
        }, {
            name: "Kencori",
            class: "Fighter",
            race: "Gnome",
            level: 30
        }
            , {
            name: "Malleus",
            class: "Cleric",
            race: "Dwarf",
            level: 30
        }, {
            name: "Apsalr",
            class: "Rogue",
            race: "Human",
            level: 30
        }])

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


}
