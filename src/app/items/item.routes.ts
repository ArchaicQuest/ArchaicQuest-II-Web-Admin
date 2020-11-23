import { Routes } from '@angular/router';
import { ViewItemsComponent } from './view-items/view-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { AuthGuard } from '../account/auth-guard.service';

export const itemRoutes: Routes = [
    { path: '', component: ViewItemsComponent, canActivate: [AuthGuard] },
    { path: 'items', component: ViewItemsComponent, canActivate: [AuthGuard] },
    { path: 'add-item', component: AddItemComponent, canActivate: [AuthGuard] },
    { path: 'edit-item/:id', component: EditItemComponent, canActivate: [AuthGuard] },
    { path: 'items/edit-item/:id', component: EditItemComponent, canActivate: [AuthGuard] },
];
