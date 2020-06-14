import { Component, OnInit, ViewChild, ViewEncapsulation, Directive } from '@angular/core';
import { MatPaginator } from '@angular/material';

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

        this.data = [{
            name: 'liam',
            class: 'Mage',
            race: 'Elf',
            level: 30
        }, {
            name: 'Kencori',
            class: 'Fighter',
            race: 'Gnome',
            level: 30
        }
            , {
            name: 'Malleus',
            class: 'Cleric',
            race: 'Dwarf',
            level: 30
        }, {
            name: 'Apsalr',
            class: 'Rogue',
            race: 'Human',
            level: 30
        },
        {
            name: 'liam',
            class: 'Mage',
            race: 'Elf',
            level: 30
        }, {
            name: 'Kencori',
            class: 'Fighter',
            race: 'Gnome',
            level: 30
        }
            , {
            name: 'Malleus',
            class: 'Cleric',
            race: 'Dwarf',
            level: 30
        }, {
            name: 'Apsalr',
            class: 'Rogue',
            race: 'Human',
            level: 30
        },
        {
            name: 'liam',
            class: 'Mage',
            race: 'Elf',
            level: 30
        }, {
            name: 'Kencori',
            class: 'Fighter',
            race: 'Gnome',
            level: 30
        }
            , {
            name: 'Malleus',
            class: 'Cleric',
            race: 'Dwarf',
            level: 30
        }, {
            name: 'Apsalr',
            class: 'Rogue',
            race: 'Human',
            level: 30
        }];

        this.filteredata = this.data.slice(0, this.defaultRecords);

    }

    onPaginateChange(e) {
        const firstCut = e.pageIndex * e.pageSize;
        const secondCut = firstCut + e.pageSize;
        this.filteredata = this.data.slice(firstCut, secondCut);
    }


}
