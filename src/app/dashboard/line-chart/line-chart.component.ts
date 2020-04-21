import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart-component.scss']
})
export class LineChartComponent implements OnInit {

    view: any[] = [700, 300];
    data: any[];
    // options
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Year';
    yAxisLabel: string = 'Population';
    timeline: boolean = true;

    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };




    constructor() {

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
                "name": "Germany",
                "series": [
                    {
                        "name": "1990",
                        "value": 62000000
                    },
                    {
                        "name": "2010",
                        "value": 73000000
                    },
                    {
                        "name": "2011",
                        "value": 89400000
                    }
                ]
            },

            {
                "name": "USA",
                "series": [
                    {
                        "name": "1990",
                        "value": 250000000
                    },
                    {
                        "name": "2010",
                        "value": 309000000
                    },
                    {
                        "name": "2011",
                        "value": 311000000
                    }
                ]
            },

            {
                "name": "France",
                "series": [
                    {
                        "name": "1990",
                        "value": 58000000
                    },
                    {
                        "name": "2010",
                        "value": 50000020
                    },
                    {
                        "name": "2011",
                        "value": 58000000
                    }
                ]
            },
            {
                "name": "UK",
                "series": [
                    {
                        "name": "1990",
                        "value": 57000000
                    },
                    {
                        "name": "2010",
                        "value": 62000000
                    }
                ]
            }
        ];

        Object.assign(this, { data: this.data });
    }


}
