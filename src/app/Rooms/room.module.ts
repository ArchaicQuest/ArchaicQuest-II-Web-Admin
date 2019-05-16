import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { roomRoutes } from './room.routes';
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
import { RoomService } from './add-room.service';
import { AddRoomComponent } from './add-room.component';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(roomRoutes),
        StoreModule.forFeature('character', characterReducer),
        EffectsModule.forFeature([CharacterEffects]),
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
        RoomService,
    ],
    declarations: [
        AddRoomComponent,

    ],
})
export class RoomModule { }
