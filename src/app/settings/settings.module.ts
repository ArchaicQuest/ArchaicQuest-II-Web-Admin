import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { SettingsRoutes } from './settings.routes';
import { MatFormFieldModule, MatCheckboxModule, MatInputModule, MatButtonModule } from '@angular/material';



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
