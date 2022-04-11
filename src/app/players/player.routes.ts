import { Routes } from '@angular/router';
import { EditMobComponent } from '../mobs/edit-mob/edit-mob.component';
import { AuthGuard } from '../account/auth-guard.service';
import { ViewPlayersComponent } from './view-players/view-players.component';
import { ViewAccountsComponent } from './view-accounts/view-accounts.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';

export const playerRoutes: Routes = [
    { path: '', component: ViewPlayersComponent, canActivate: [AuthGuard] },
    { path: 'view/:id', component: ViewPlayersComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditPlayerComponent, canActivate: [AuthGuard] },
    { path: 'accounts', component: ViewAccountsComponent, canActivate: [AuthGuard] },
    // { path: 'edit-player/:id', component: EditMobComponent, canActivate: [AuthGuard] },
];
