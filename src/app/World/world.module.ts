import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { worldRoutes } from './world.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import {
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule
} from '@angular/material';
import { InventoryComponent } from '../characters/inventory/inventory.component';
import { characterReducer } from '../characters/state/character.reducer';
import { EquipmentComponent } from '../characters/equipment/equipment.component';
import { CharacterEffects } from '../characters/state/character.effects';
import { ArmourClassComponent } from '../characters/armour-class/armour-class.component';
import { AreaService } from './area/add-area/add-area.service';
import { AddAreaComponent } from './area/add-area/add-area.component';
import { AddRoomComponent } from './rooms/add-room.component';
import { RoomService } from './rooms/add-room.service';
import { ViewAreasComponent } from './area/view-areas/view-areas.component';
import { EditAreaComponent } from './area/edit-area/edit-area.component';
import { EditService } from './area/edit-area/edit-area.service';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(worldRoutes),
        // StoreModule.forFeature('character', characterReducer),
        // EffectsModule.forFeature([CharacterEffects]),
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
        AreaService,
        EditService,
        RoomService
    ],
    declarations: [
        AddAreaComponent,
        AddRoomComponent,
        ViewAreasComponent,
        EditAreaComponent

    ],
})
export class WorldModule { }
