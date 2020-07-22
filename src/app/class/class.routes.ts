import { Routes } from '@angular/router';
import { ViewClassComponent } from './view-class/view-class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';

export const classRoutes: Routes = [
    { path: '', component: ViewClassComponent },
    { path: 'view', component: ViewClassComponent },
    { path: 'add', component: AddClassComponent },
    { path: 'edit/:id', component: EditClassComponent },
    // { path: 'items/edit-item/:id', component: EditItemComponent },
];
