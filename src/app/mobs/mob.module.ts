import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { mobRoutes } from './mob.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import {
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule
} from '@angular/material';
import { MobService } from './add-mob.service';
import { AddMobComponent } from './add-mob.component';
import { ItemService } from '../items/add-item/add-item.service';
import { InventoryComponent } from '../characters/inventory/inventory.component';
import { characterReducer } from '../characters/state/character.reducer';
import { EquipmentComponent } from '../characters/equipment/equipment.component';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(mobRoutes),
        StoreModule.forFeature('character', characterReducer),
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule
    ],
    providers: [
        MobService,
        ItemService
    ],
    declarations: [
        AddMobComponent,
        InventoryComponent,
        EquipmentComponent
    ],
})
export class MobModule { }
