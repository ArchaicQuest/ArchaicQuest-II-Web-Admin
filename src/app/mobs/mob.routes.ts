import { Routes } from '@angular/router';
import { AddMobComponent } from './add-mob.component';

export const mobRoutes: Routes = [
    { path: 'add-mob', component: AddMobComponent },
    { path: 'edit-mob/:id', component: AddMobComponent },
];
