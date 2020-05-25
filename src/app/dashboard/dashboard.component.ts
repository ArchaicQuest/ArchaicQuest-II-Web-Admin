import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { QuickStats } from './quick-stats.interface';
import { take } from 'rxjs/operators';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    //  displayedColumns: string[] = ['name', 'race', 'class', 'level', 'actions'];
    //  dataSource: MatTableDataSource<any>;
    quickStats: QuickStats = {
        areaCount: 0,
        itemCount: 0,
        mobCount: 0,
        questCount: 0,
        roomCount: 0
    };

    players: any;
    filteredArray: any[] = []
    defaultRecords: number = 2;
    pageEvent: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    //  @ViewChild(MatSort) sort: MatSort;

    constructor(private service: DashboardService) {
    }

    ngOnInit() {

        this.players = [{
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

        this.filteredArray = this.players.slice(0, this.defaultRecords);

        // this.dataSource = new MatTableDataSource([{
        //     name: "liam",
        //     class: "Mage",
        //     race: "Elf",
        //     level: 30
        // }, {
        //     name: "Kencori",
        //     class: "Fighter",
        //     race: "Gnome",
        //     level: 30
        // }
        //     , {
        //     name: "Malleus",
        //     class: "Cleric",
        //     race: "Dwarf",
        //     level: 30
        // }, {
        //     name: "Apsalr",
        //     class: "Rogue",
        //     race: "Human",
        //     level: 30
        // }])

        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;


        this.service.getQuickStats().pipe(take(1)).subscribe((x) => {
            this.quickStats.areaCount = x.areaCount;
            this.quickStats.itemCount = x.itemCount;
            this.quickStats.mobCount = x.mobCount;
            this.quickStats.questCount = x.questCount;
            this.quickStats.roomCount = x.roomCount;
        })
    }

    onPaginateChange(e) {
        let firstCut = e.pageIndex * e.pageSize;
        let secondCut = firstCut + e.pageSize;
        this.filteredArray = this.players.slice(firstCut, secondCut);
    }


}
