import { Routes } from '@angular/router';
import { AuthGuard } from '../Account/auth-guard.service';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
    {
        path: '', component: DashboardComponent,

    },
    { path: 'dashboard', component: DashboardComponent }
];
