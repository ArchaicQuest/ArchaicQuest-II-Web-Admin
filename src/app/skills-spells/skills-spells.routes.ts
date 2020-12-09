import { Routes } from '@angular/router';
import { ViewSkillsSpellsComponent } from './view-skills-spells/view-skills-spells.component';
import { AddSkillsSpellComponent } from './add-skills-spells/add-skills-spells.component';
import { EditSkillsSpellComponent } from './edit-skills-spells/edit-skills-spells.component';
import { AuthGuard } from '../account/auth-guard.service';

export const skillSpellsRoutes: Routes = [
    { path: '', component: ViewSkillsSpellsComponent, canActivate: [AuthGuard] },
    { path: 'view', component: ViewSkillsSpellsComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddSkillsSpellComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditSkillsSpellComponent, canActivate: [AuthGuard] },
];
