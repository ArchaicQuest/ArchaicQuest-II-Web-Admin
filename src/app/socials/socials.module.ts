import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SocialsService } from './socials.service';
import { SocialsComponent } from './socials.component';
import { SocialsRoutes } from './socials.routes';
import { ViewSocialsComponent } from './view-socials/view-socias.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(SocialsRoutes),
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatPaginatorModule
    ],
    providers: [
        SocialsService
    ],
    declarations: [
        SocialsComponent,
        ViewSocialsComponent

    ],
})
export class SocialsModule { }
