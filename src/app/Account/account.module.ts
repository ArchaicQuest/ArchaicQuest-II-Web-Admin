import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './Login/login.service';
import { LoginComponent } from './Login/login.component';
import { accountRoutes } from './account.routes';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(accountRoutes),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    providers: [
        LoginService,
    ],
    declarations: [
        LoginComponent
    ],
})
export class LoginModule { }
