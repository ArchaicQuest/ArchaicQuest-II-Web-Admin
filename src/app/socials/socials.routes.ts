import { Routes } from '@angular/router';
import { SocialsComponent } from './socials.component';
import { ViewSocialsComponent } from './view-socials/view-socias.component';

export const SocialsRoutes: Routes = [
    { path: '', component: ViewSocialsComponent },
    { path: 'socials', component: ViewSocialsComponent },
    { path: 'add-social', component: SocialsComponent },
    { path: 'edit-social/:id', component: SocialsComponent },
];
