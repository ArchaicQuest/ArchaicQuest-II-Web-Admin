import { Routes } from '@angular/router';
import { AuthGuard } from '../account/auth-guard.service';
import { SocialsComponent } from './socials.component';
import { ViewSocialsComponent } from './view-socials/view-socias.component';

export const SocialsRoutes: Routes = [
    { path: '', component: ViewSocialsComponent, canActivate: [AuthGuard] },
    { path: 'socials', component: ViewSocialsComponent, canActivate: [AuthGuard] },
    { path: 'add-social', component: SocialsComponent, canActivate: [AuthGuard] },
    { path: 'edit-social/:id', component: SocialsComponent, canActivate: [AuthGuard] },
];
