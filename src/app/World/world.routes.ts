import { Routes } from '@angular/router';
import { AddAreaComponent } from './area/add-area/add-area.component';
import { AddRoomComponent } from './rooms/add-room.component';
import { ViewAreasComponent } from './area/view-areas/view-areas.component';
import { EditAreaComponent } from './area/edit-area/edit-area.component';

export const worldRoutes: Routes = [
    { path: 'list-areas', component: ViewAreasComponent },
    { path: 'add-area', component: AddAreaComponent },
    { path: 'edit-area/:id', component: EditAreaComponent },
    { path: 'add-room', component: AddRoomComponent },
    { path: 'edit-room/:id', component: AddRoomComponent },
];
