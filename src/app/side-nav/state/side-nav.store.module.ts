import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sidenavReducer } from './side-nav-reducers';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTooltipModule,
        StoreModule.forFeature('sidenav', sidenavReducer),
    ]
})
export class SidenavStoreModule {
}
