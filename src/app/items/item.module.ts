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
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule } from '@angular/material';



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
        MatButtonModule
    ],
    declarations: [
        AddItemComponent
    ]
})
export class ItemModule { }
