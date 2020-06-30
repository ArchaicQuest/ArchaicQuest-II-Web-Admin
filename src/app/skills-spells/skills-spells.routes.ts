import { Routes } from '@angular/router';
import { ViewSkillsSpellsComponent } from './view-skills-spells/view-skills-spells.component';
import { AddSkillsSpellComponent } from './add-skills-spells/add-skills-spells.component';
import { EditSkillsSpellComponent } from './edit-skills-spells/edit-skills-spells.component';

export const skillSpellsRoutes: Routes = [
    { path: '', component: ViewSkillsSpellsComponent },
    { path: 'view', component: ViewSkillsSpellsComponent },
    { path: 'add', component: AddSkillsSpellComponent },
    { path: 'edit/:id', component: EditSkillsSpellComponent },
];
