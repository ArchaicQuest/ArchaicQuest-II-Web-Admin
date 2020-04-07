import { Routes } from '@angular/router';
import { ViewItemsComponent } from './view-items/view-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';

export const itemRoutes: Routes = [
    { path: '', component: ViewItemsComponent },
    { path: 'items', component: ViewItemsComponent },
    { path: 'add-item', component: AddItemComponent },
    { path: 'edit-item/:id', component: EditItemComponent },
    { path: 'items/edit-item/:id', component: EditItemComponent },
];
