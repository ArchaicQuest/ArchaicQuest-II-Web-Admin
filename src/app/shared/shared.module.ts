import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { LineTruncationLibModule } from 'ngx-line-truncation';
import { ItemTypePipe } from '../items/pipes/item-type.pipe.';
import { EffectLocationPipe } from '../skills-spells/pipes/effect-location.pipe';
import { ItemSelectorComponent } from '../items/selectors/Item-selector/item-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MobSelectorComponent } from '../mobs/mob-selector/mob-selector.component';
import { AuthenticationService } from '../account/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { AuthGuard } from '../account/auth-guard.service';
import { Shared } from './shared';

@NgModule({
    declarations: [HeaderComponent, ItemTypePipe, EffectLocationPipe, ItemSelectorComponent, MobSelectorComponent],
    imports: [CommonModule, LineTruncationLibModule, MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule, ReactiveFormsModule],
    exports: [CommonModule, HeaderComponent, LineTruncationLibModule, ItemTypePipe, EffectLocationPipe, ItemSelectorComponent, MobSelectorComponent, MatFormFieldModule,
        MatInputModule, ReactiveFormsModule,
        MatAutocompleteModule],
    providers: [AuthGuard, Shared,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, AuthenticationService]
})
export class SharedModule { }
