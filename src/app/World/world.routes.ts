import { Routes } from '@angular/router';
import { AddAreaComponent } from './area/add-area/add-area.component';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { ViewAreasComponent } from './area/view-areas/view-areas.component';
import { EditAreaComponent } from './area/edit-area/edit-area.component';
import { ViewAreaComponent } from './area/view-area/view-area.component';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { AuthGuard } from '../account/auth-guard.service';

export const worldRoutes: Routes = [
    { path: 'list-areas', component: ViewAreasComponent, canActivate: [AuthGuard] },
    { path: 'area/:id', component: ViewAreaComponent, canActivate: [AuthGuard] },
    { path: 'area/:id/add-room/:x/:y/:z', component: AddRoomComponent, canActivate: [AuthGuard] },
    { path: 'add-area', component: AddAreaComponent, canActivate: [AuthGuard] },
    { path: 'edit-area/:id', component: EditAreaComponent, canActivate: [AuthGuard] },
    { path: 'add-room/:id/:x/:y/:z', component: AddRoomComponent, canActivate: [AuthGuard] },

    { path: 'area/:id/edit-room/:roomId', component: EditRoomComponent, canActivate: [AuthGuard] },

    // http://localhost:1337/world/area/2/add-room/-1/3/0
];
