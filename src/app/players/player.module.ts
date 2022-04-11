import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { ItemService } from '../items/add-item/add-item.service';
import { InventoryComponent } from '../characters/inventory/inventory.component';
import { characterReducer } from '../characters/state/character.reducer';
import { EquipmentComponent } from '../characters/equipment/equipment.component';
import { CharacterEffects } from '../characters/state/character.effects';
import { ArmourClassComponent } from '../characters/armour-class/armour-class.component';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { CodeEditorModule } from '@ngstack/code-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { playerRoutes } from './player.routes';
import { ViewPlayerService } from './view-players/view-players.service';
import { ViewPlayersComponent } from './view-players/view-players.component';
import { HPFormulaPipe } from '../mobs/pipes/hp-formula.pipe';
import { ManaFormulaPipe } from '../mobs/pipes/mana-formula.pipe';
import { EncumbranceFormulaPipe } from '../mobs/pipes/encumbrance-formula.pipe';
import { MovesFormulaPipe } from '../mobs/pipes/moves-formula.pipe';
import { PositionPipe } from '../mobs/pipes/position.pipe';
import { EditMobComponent } from '../mobs/edit-mob/edit-mob.component';
import { ViewAccountsComponent } from './view-accounts/view-accounts.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(playerRoutes),
        StoreModule.forFeature('character', characterReducer),
        EffectsModule.forFeature([CharacterEffects]),
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        CodeEditorModule.forChild()
    ],
    providers: [
        ViewPlayerService,
        ItemService,
    ],
    declarations: [
        ViewPlayersComponent,
        ViewAccountsComponent,
        EditPlayerComponent
    ],
})
export class PlayersModule { }
