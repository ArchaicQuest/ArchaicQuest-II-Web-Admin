import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const accountRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent }
];
