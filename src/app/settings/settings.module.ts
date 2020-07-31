import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { SettingsRoutes } from './settings.routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(SettingsRoutes),
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
    ],
    providers: [
        SettingsService
    ],
    declarations: [
        SettingsComponent

    ],
})
export class SettingsModule { }
