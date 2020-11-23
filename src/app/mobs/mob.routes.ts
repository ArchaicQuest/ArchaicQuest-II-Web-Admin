import { Routes } from '@angular/router';
import { AddMobComponent } from './add-mob.component';
import { ViewMobsComponent } from './view-mobs/view-mobs.component';
import { EditMobComponent } from './edit-mob/edit-mob.component';
import { AuthGuard } from '../account/auth-guard.service';

export const mobRoutes: Routes = [
    { path: '', component: ViewMobsComponent, canActivate: [AuthGuard] },
    { path: 'mobs', component: ViewMobsComponent, canActivate: [AuthGuard] },
    { path: 'add-mob', component: AddMobComponent, canActivate: [AuthGuard] },
    { path: 'edit-mob/:id', component: EditMobComponent, canActivate: [AuthGuard] },
];
