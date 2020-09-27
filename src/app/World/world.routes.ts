import { Routes } from '@angular/router';
import { AddAreaComponent } from './area/add-area/add-area.component';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { ViewAreasComponent } from './area/view-areas/view-areas.component';
import { EditAreaComponent } from './area/edit-area/edit-area.component';
import { ViewAreaComponent } from './area/view-area/view-area.component';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';

export const worldRoutes: Routes = [
    { path: 'list-areas', component: ViewAreasComponent },
    { path: 'area/:id', component: ViewAreaComponent },
    { path: 'area/:id/add-room/:x/:y/:z', component: AddRoomComponent, },
    { path: 'add-area', component: AddAreaComponent },
    { path: 'edit-area/:id', component: EditAreaComponent },
    { path: 'add-room/:id/:x/:y/:z', component: AddRoomComponent },

    { path: 'area/:id/edit-room/:roomId', component: EditRoomComponent },

    // http://localhost:1337/world/area/2/add-room/-1/3/0
];
