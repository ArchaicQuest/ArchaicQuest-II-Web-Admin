import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';

export const accountRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent }
];
