import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { mobRoutes } from './mob.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { AddMobService } from './add-mob.service';
import { AddMobComponent } from './add-mob.component';
import { ItemService } from '../items/add-item/add-item.service';
import { InventoryComponent } from '../characters/inventory/inventory.component';
import { characterReducer } from '../characters/state/character.reducer';
import { EquipmentComponent } from '../characters/equipment/equipment.component';
import { CharacterEffects } from '../characters/state/character.effects';
import { ArmourClassComponent } from '../characters/armour-class/armour-class.component';
import { MobService } from './mob.service';
import { MobPreviewComponent } from './mob-preview/mob-preview.component';
import { HPFormulaPipe } from './pipes/hp-formula.pipe';
import { ManaFormulaPipe } from './pipes/mana-formula.pipe';
import { MovesFormulaPipe } from './pipes/moves-formula.pipe';
import { EncumbranceFormulaPipe } from './pipes/encumbrance-formula.pipe';
import { PositionPipe } from './pipes/position.pipe';
import { ViewMobService } from './view-mobs/view-mobs.service';
import { ViewMobsComponent } from './view-mobs/view-mobs.component';
import { EditMobService } from './edit-mob/edit-mob.service';
import { EditMobComponent } from './edit-mob/edit-mob.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(mobRoutes),
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
        MobService,
        AddMobService,
        ItemService,
        ViewMobService,
        EditMobService
    ],
    declarations: [
        AddMobComponent,
        ArmourClassComponent,
        InventoryComponent,
        EquipmentComponent,
        MobPreviewComponent,
        HPFormulaPipe,
        ManaFormulaPipe,
        MovesFormulaPipe,
        EncumbranceFormulaPipe,
        PositionPipe,
        ViewMobsComponent,
        EditMobComponent
    ],
})
export class MobModule { }
