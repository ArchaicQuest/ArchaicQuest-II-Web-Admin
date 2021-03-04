import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CraftingRecipesComponent } from './crafting-recipes.component';
import { EditCraftingRecipesComponent } from './edit-crafting-recipes/edit-crafting-recipes.component';
import { ViewCraftingRecipesComponent } from './view-crafting-recipes/view-crafting-recipes.component';
import { CraftingRecipesService } from './crafting-recipes.service';
import { CraftingRoutes } from './crafting-recipes.routes';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(CraftingRoutes),
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    providers: [
        CraftingRecipesService,
    ],
    declarations: [
        CraftingRecipesComponent,
        EditCraftingRecipesComponent,
        ViewCraftingRecipesComponent

    ],
})
export class CraftingRecipesModule { }
