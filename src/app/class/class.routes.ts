import { Routes } from '@angular/router';
import { ViewClassComponent } from './view-class/view-class.component';

export const classRoutes: Routes = [
    { path: '', component: ViewClassComponent },
    { path: 'view', component: ViewClassComponent },
    { path: 'add', component: ViewClassComponent },
    // { path: 'add-item', component: AddItemComponent },
    // { path: 'edit-item/:id', component: EditItemComponent },
    // { path: 'items/edit-item/:id', component: EditItemComponent },
];
