import { Routes } from '@angular/router';
import { AuthGuard } from '../account/auth-guard.service';
import { CraftingRecipesComponent } from './crafting-recipes.component';
import { EditCraftingRecipesComponent } from './edit-crafting-recipes/edit-crafting-recipes.component';
import { ViewCraftingRecipesComponent } from './view-crafting-recipes/view-crafting-recipes.component';

export const CraftingRoutes: Routes = [
    { path: '', component: ViewCraftingRecipesComponent, canActivate: [AuthGuard] },
    { path: 'view', component: ViewCraftingRecipesComponent, canActivate: [AuthGuard] },
    { path: 'add', component: CraftingRecipesComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditCraftingRecipesComponent, canActivate: [AuthGuard] },
];
