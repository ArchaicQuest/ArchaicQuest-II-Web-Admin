import { Routes } from '@angular/router';
import { AuthGuard } from '../account/auth-guard.service';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
    {
        path: '', component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
