import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DashboardService } from './dashboard.service';
import { QuickStats } from './quick-stats.interface';
import { take } from 'rxjs/operators';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    quickStats: QuickStats = {
        areaCount: 0,
        itemCount: 0,
        mobCount: 0,
        questCount: 0,
        roomCount: 0
    };

    players: any[] = [];
    filteredArray: any[] = []
    defaultRecords: number = 10;
    pageEvent: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(private service: DashboardService) {
    }

    ngOnInit() {

        // TODO: setInterval to update every 30 seconds or whatever
        this.service.getWhoList().pipe(take(1)).subscribe(who => {

            who.forEach(player => {
                this.players.push({
                    name: player['value'].name,
                    class: player['value'].className,
                    race: player['value'].race,
                    level: player['value'].level
                });
            });

            this.filteredArray = this.players.slice(0, this.defaultRecords);
        });


        this.service.getQuickStats().pipe(take(1)).subscribe((x) => {
            this.quickStats.areaCount = x.areaCount;
            this.quickStats.itemCount = x.itemCount;
            this.quickStats.mobCount = x.mobCount;
            this.quickStats.questCount = x.questCount;
            this.quickStats.roomCount = x.roomCount;
        });
    }

    onPaginateChange(e) {
        let firstCut = e.pageIndex * e.pageSize;
        let secondCut = firstCut + e.pageSize;
        this.filteredArray = this.players.slice(firstCut, secondCut);
    }


}
