import { Routes } from '@angular/router';
import { ViewSkillsSpellsComponent } from './view-skills-spells/view-skills-spells.component';
import { AddSkillsSpellComponent } from './add-skills-spells/add-skills-spells.component';

export const skillSpellsRoutes: Routes = [
    { path: '', component: ViewSkillsSpellsComponent },
    { path: 'skills-spells', component: ViewSkillsSpellsComponent },
    { path: 'add-skills-spells', component: AddSkillsSpellComponent },
    // { path: 'add-item', component: AddItemComponent },
    // { path: 'edit-item/:id', component: EditItemComponent },
    // { path: 'items/edit-item/:id', component: EditItemComponent },
];
