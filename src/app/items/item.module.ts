import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { itemRoutes } from './item.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { addItemReducer } from './state/add-item.reducer';
import { AddItemEffects } from './state/add-item.effects';
import { SharedModule } from '../shared/shared.module';
import { AddItemComponent } from './add-item/add-item.component';
import {
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatButtonModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule
} from '@angular/material';
import { ViewItemsComponent } from './view-items/view-items.component';
import { ItemTypeSelectorComponent } from './selectors/item-type/item-type-selector.component';
import { WeaponTypeSelectorComponent } from './selectors/weapon-type/weapon-type-selector.component';
import { AttackTypeSelectorComponent } from './selectors/attack-type/attack-type-selector.component';
import { ItemSlotSelectorComponent } from './selectors/item-slot/item-slot-selector.component';
import { DamageTypeSelectorComponent } from './selectors/damage-type/damage-type-selector.component';
import { ArmourTypeSelectorComponent } from './selectors/armour-type/armour-type-selector.component';
import { ItemService } from './add-item/add-item.service';
import { ItemPreviewComponent } from './item-preview/item-preview.component';
import { AverageDamagePipe } from '../shared/pipes/average-damage.pipe';
import { WeaponTypePipe } from './pipes/weapon-type.pipe';
import { AttackTypePipe } from './pipes/attack-type.pipe';
import { DamageTypePipe } from './pipes/damage-type.pipe';
import { ArmourTypePipe } from './pipes/armour-type.pipe';
import { ContainerSizePipe } from './pipes/container-size.pipe';
import { EditItemComponent } from './edit-item/edit-item.component';




@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(itemRoutes),
        StoreModule.forFeature('item', addItemReducer),
        EffectsModule.forFeature([AddItemEffects]),
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule,

    ],
    providers: [
        ItemService
    ],
    declarations: [
        AddItemComponent,
        EditItemComponent,
        ViewItemsComponent,
        ItemTypeSelectorComponent,
        WeaponTypeSelectorComponent,
        AttackTypeSelectorComponent,
        ItemSlotSelectorComponent,
        DamageTypeSelectorComponent,
        ArmourTypeSelectorComponent,
        ItemPreviewComponent,
        AverageDamagePipe,
        WeaponTypePipe,
        AttackTypePipe,
        DamageTypePipe,
        ArmourTypePipe,
        ContainerSizePipe

    ],
})
export class ItemModule { }
