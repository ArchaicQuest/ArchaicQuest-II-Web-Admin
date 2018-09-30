import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Item } from '../interfaces/item.interface';
import { ViewItemsService } from './view-items.service';

@Component({
    templateUrl: './view-items.component.html',
    styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {
    items: Item[] = [];
    displayedColumns: string[] = ['id', 'name', 'itemType', 'slot', 'description', 'examDesc', 'roomDesc', 'weaponType', 'attackType', 'armourType' 'itemFlag', 'questItem'];
    dataSource: MatTableDataSource<Item>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private viewItemsService: ViewItemsService) {

    }

    ngOnInit() {

        this.viewItemsService.getItemTypes().subscribe((items) => {
            this.items = items;
            console.log(items)
            this.dataSource = new MatTableDataSource(this.items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })




    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }


    }
}
