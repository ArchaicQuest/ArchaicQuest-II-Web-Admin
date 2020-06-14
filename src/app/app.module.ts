import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Shared } from './shared/shared';
import { SharedService } from './shared/shared.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SidenavStoreModule } from './side-nav/state/side-nav.store.module';



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
