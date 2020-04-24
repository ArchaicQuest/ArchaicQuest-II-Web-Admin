import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { dashboardRoutes } from './dashboard.routes';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DashboardComponent } from './dashboard.component';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(dashboardRoutes),
        MatMenuModule,
        MatIconModule,
        NgxChartsModule,
        MatTableModule,
        MatPaginatorModule,

    ],
    providers: [

    ],
    declarations: [
        DashboardComponent,
        LineChartComponent

    ],
})
export class DashboardModule { }
