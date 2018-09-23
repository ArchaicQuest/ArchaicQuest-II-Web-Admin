import { Routes } from "@angular/router";
import { AddItemComponent } from "./add-item/add-item.component";

export const itemRoutes: Routes = [
    { path: '', component: AddItemComponent },
    { path: 'items', component: AddItemComponent },
];
