import { Routes } from '@angular/router';
import { AuthGuard } from '../account/auth-guard.service';
import { SettingsComponent } from './settings.component';

export const SettingsRoutes: Routes = [
    { path: '', component: SettingsComponent, canActivate: [AuthGuard] },
];
