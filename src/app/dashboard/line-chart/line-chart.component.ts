import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart-component.scss']
})
export class LineChartComponent implements OnInit {

    view: any[] = [];
    data: any[];
    // options
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Months';
    yAxisLabel: string = 'Characters';
    timeline: boolean = false;
    legendPosition = 'right';
    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };




    constructor() {
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
        this.data = [
            {
                "name": "Accounts",
                "series": [
                    {
                        "name": "November 2019",
                        "value": 3
                    },
                    {
                        "name": "December 2019",
                        "value": 11
                    },
                    {
                        "name": "January 2020",
                        "value": 5
                    },
                    {
                        "name": "February 2020",
                        "value": 88
                    },
                    {
                        "name": "March 2020",
                        "value": 34
                    },
                    {
                        "name": "April 2020",
                        "value": 79
                    }
                ]
            },
            {
                "name": "Characters",
                "series": [
                    {
                        "name": "November 2019",
                        "value": 5
                    },
                    {
                        "name": "December 2019",
                        "value": 60
                    },
                    {
                        "name": "January 2020",
                        "value": 4
                    },
                    {
                        "name": "February 2020",
                        "value": 2
                    },
                    {
                        "name": "March 2020",
                        "value": 110
                    },
                    {
                        "name": "April 2020",
                        "value": 25
                    }
                ]
            }
        ];

        Object.assign(this, { data: this.data });
    }


}
