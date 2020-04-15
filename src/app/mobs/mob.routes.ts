import { Routes } from '@angular/router';
import { AddMobComponent } from './add-mob.component';
import { ViewMobsComponent } from './view-mobs/view-mobs.component';
import { EditMobComponent } from './edit-mob/edit-mob.component';

export const mobRoutes: Routes = [
    { path: '', component: ViewMobsComponent },
    { path: 'mobs', component: ViewMobsComponent },
    { path: 'add-mob', component: AddMobComponent },
    { path: 'edit-mob/:id', component: EditMobComponent },
];
