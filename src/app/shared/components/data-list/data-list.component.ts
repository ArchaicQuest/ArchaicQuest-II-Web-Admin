import { Component, OnInit, ViewChild, ViewEncapsulation, Directive } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive()
export abstract class DataListComponent implements OnInit {
    data: any;
    filteredata: any[] = [];
    defaultRecords = 10;
    pageEvent: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor() {
    }

    ngOnInit() {


        this.filteredata = this.data.slice(0, this.defaultRecords);

    }

    onPaginateChange(e) {
        const firstCut = e.pageIndex * e.pageSize;
        const secondCut = firstCut + e.pageSize;
        this.filteredata = this.data.slice(firstCut, secondCut);
    }


}
