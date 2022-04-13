import { Component, Input, OnInit } from '@angular/core';
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


  @Input() showLoginData;
  @Input() showAccountData;
  @Input() showMobKills;

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

    if (this.showAccountData) {

      this.service.getAccountStats().pipe(take(1)).subscribe(stats => {

        this.data = stats['data'];
        Object.assign(this, { data: this.data });

      });
    }

    if (this.showLoginData) {
      this.service.getAccountLoginStats().pipe(take(1)).subscribe(stats => {

        this.data = stats['data'];
        Object.assign(this, { data: this.data });
        this.xAxisLabel = "Last 30 days";
        this.yAxisLabel = "Logins"

      });
    }

    if (this.showMobKills) {
      this.service.getMobKillStats().pipe(take(1)).subscribe(stats => {

        this.data = stats['data'];
        Object.assign(this, { data: this.data });
        this.xAxisLabel = "Last 30 days";
        this.yAxisLabel = "Mob Kills / Player deaths"

      });
    }


  }


}
