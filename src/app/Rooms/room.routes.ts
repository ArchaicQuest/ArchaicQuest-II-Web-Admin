import { Routes } from '@angular/router';
import { AddRoomComponent } from './add-room.component';

export const roomRoutes: Routes = [
    { path: 'add-room', component: AddRoomComponent },
    { path: 'edit-room/:id', component: AddRoomComponent },
];
