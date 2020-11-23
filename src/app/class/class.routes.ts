import { Routes } from '@angular/router';
import { ViewClassComponent } from './view-class/view-class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { AuthGuard } from '../account/auth-guard.service';

export const classRoutes: Routes = [
    { path: '', component: ViewClassComponent, canActivate: [AuthGuard] },
    { path: 'view', component: ViewClassComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddClassComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditClassComponent, canActivate: [AuthGuard] },
    // { path: 'items/edit-item/:id', component: EditItemComponent },
];
