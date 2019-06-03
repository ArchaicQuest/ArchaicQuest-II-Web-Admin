import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { worldRoutes } from './world.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import {
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule, MatDialogModule
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
import { ViewAreaComponent } from './area/view-area/view-area.component';
import { ViewAreaService } from './area/view-area/view-area.service';
import { AppRoutingModule } from '../app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { ItemSelectorComponent } from '../items/selectors/Item-selector/item-selector.component';
import { ItemService } from '../items/add-item/add-item.service';
import { ManageContainerItemsComponent } from './rooms/manage-container-items/manage-container-items.component';
import { MobSelectorComponent } from '../mobs/mob-selector/mob-selector.component';
import { ManageMobComponent } from './rooms/manage-mob/manage-mob.component';



@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
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
        MatAutocompleteModule,
        MatDialogModule
    ],
    providers: [
        AreaService,
        ViewAreaService,
        EditService,
        RoomService,
        ItemService
    ],
    entryComponents: [ManageContainerItemsComponent, ManageMobComponent],
    declarations: [
        AddAreaComponent,
        AddRoomComponent,
        ViewAreasComponent,
        ViewAreaComponent,
        EditAreaComponent,
        ItemSelectorComponent,
        MobSelectorComponent,
        ManageContainerItemsComponent,
        ManageMobComponent


    ],
})
export class WorldModule { }
