import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManageAccountsComponent } from './manage/manage.component';

export const accountRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'manage', component: ManageAccountsComponent }
];
