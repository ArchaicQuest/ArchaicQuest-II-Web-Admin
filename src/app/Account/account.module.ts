import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { accountRoutes } from './account.routes';
import { ManageAccountsComponent } from './manage/manage.component';
import { AccountService } from './account.service';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(accountRoutes),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule
    ],
    providers: [
        AccountService,
    ],
    declarations: [
        LoginComponent,
        ManageAccountsComponent
    ],
})
export class LoginModule { }
