import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { LineTruncationLibModule } from 'ngx-line-truncation';
import { ItemTypePipe } from '../items/pipes/item-type.pipe.';
import { EffectLocationPipe } from '../skills-spells/pipes/effect-location.pipe';

@NgModule({
    declarations: [HeaderComponent, ItemTypePipe, EffectLocationPipe],
    imports: [CommonModule, LineTruncationLibModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, LineTruncationLibModule, ItemTypePipe, EffectLocationPipe]
})
export class SharedModule { }
