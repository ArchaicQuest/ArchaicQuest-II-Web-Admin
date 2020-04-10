import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatSidenavModule, MatExpansionModule, MatTooltipModule } from '@angular/material';
import { Shared } from './shared/shared';
import { SidenavStoreModule } from './side-nav/state/side-nav.store.module';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { SharedService } from './shared/shared.service';

@NgModule({
    declarations: [
        AppComponent,
        SideNavComponent,
    ],
    imports: [
        //  ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'Archaic Quest II',
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        BrowserAnimationsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTooltipModule,
        SidenavStoreModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-center'
        })
    ],
    providers: [Shared, SharedService],
    bootstrap: [AppComponent]
})
export class AppModule { }
