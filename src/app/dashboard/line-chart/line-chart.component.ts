import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart-component.scss']
})
export class LineChartComponent implements OnInit {

    view: any[] = [];
    data: any[];
    // options
    legend = true;
    showLabels = true;
    animations = true;
    xAxis = true;
    yAxis = true;
    showYAxisLabel = true;
    showXAxisLabel = true;
    xAxisLabel = 'Months';
    yAxisLabel = 'Characters';
    timeline = false;
    legendPosition = 'right';
    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };




    constructor(private service: DashboardService) {
        this.view = [window.innerWidth / 1.25, 400];

        if (window.innerWidth <= 768) {
            this.showYAxisLabel = false;
            this.showXAxisLabel = false;
            this.legendPosition = 'below';
        } else {
            this.legendPosition = 'right';
        }
    }

    onResize(event) {
        this.view = [event.target.innerWidth / 1.25, 400];
        if (event.target.innerWidth <= 768) {
            this.showYAxisLabel = false;
            this.showXAxisLabel = false;
            this.legendPosition = 'below';
        } else {
            this.legendPosition = 'right';
        }
    }

    onSelect(data): void {
        console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

    ngOnInit() {

        this.service.getAccountStats().pipe(take(1)).subscribe(stats => {

            this.data = stats['data'];
            Object.assign(this, { data: this.data });

        });

        // this.data = [
        //     {
        //         "name": "Accounts",
        //         "series": [
        //             {
        //                 "name": "November 2019",
        //                 "value": 3
        //             },
        //             {
        //                 "name": "December 2019",
        //                 "value": 11
        //             },
        //             {
        //                 "name": "January 2020",
        //                 "value": 5
        //             },
        //             {
        //                 "name": "February 2020",
        //                 "value": 88
        //             },
        //             {
        //                 "name": "March 2020",
        //                 "value": 34
        //             },
        //             {
        //                 "name": "April 2020",
        //                 "value": 79
        //             }
        //         ]
        //     },
        //     {
        //         "name": "Characters",
        //         "series": [
        //             {
        //                 "name": "November 2019",
        //                 "value": 5
        //             },
        //             {
        //                 "name": "December 2019",
        //                 "value": 60
        //             },
        //             {
        //                 "name": "January 2020",
        //                 "value": 4
        //             },
        //             {
        //                 "name": "February 2020",
        //                 "value": 2
        //             },
        //             {
        //                 "name": "March 2020",
        //                 "value": 110
        //             },
        //             {
        //                 "name": "April 2020",
        //                 "value": 25
        //             }
        //         ]
        //     }
        // ];


    }


}
