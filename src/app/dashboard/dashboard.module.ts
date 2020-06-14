import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { dashboardRoutes } from './dashboard.routes';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(dashboardRoutes),
        MatMenuModule,
        MatIconModule,
        NgxChartsModule,
        MatPaginatorModule,

    ],
    providers: [
        DashboardService
    ],
    declarations: [
        DashboardComponent,
        LineChartComponent

    ],
})
export class DashboardModule { }
