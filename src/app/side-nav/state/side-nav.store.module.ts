import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sidenavReducer } from './side-nav-reducers';
import { MatSidenavModule, MatExpansionModule, MatTooltipModule } from '@angular/material';

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
