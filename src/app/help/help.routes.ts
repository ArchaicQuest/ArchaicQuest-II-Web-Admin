import { Routes } from '@angular/router';
import { AuthGuard } from '../account/auth-guard.service';
import { AddHelpComponent } from './add-help/add-help.component';
import { EditHelpComponent } from './edit-help/edit-help.component';
import { ViewHelpComponent } from './view-help/view-help.component';

export const helpRoutes: Routes = [
    { path: '', component: ViewHelpComponent, canActivate: [AuthGuard] },
    { path: 'view', component: ViewHelpComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddHelpComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditHelpComponent, canActivate: [AuthGuard] },

];
