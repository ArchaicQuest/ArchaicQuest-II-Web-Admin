import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { dashboardRoutes } from './dashboard.routes';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material';




@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(dashboardRoutes),
        MatMenuModule,
        MatIconModule,

    ],
    providers: [

    ],
    declarations: [


    ],
})
export class DashboardModule { }
