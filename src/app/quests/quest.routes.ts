import { Routes } from '@angular/router';
import { QuestComponent } from './quest.component';
import { ViewQuestsComponent } from './view-quests/view-quests.component';

export const QuestRoutes: Routes = [
    { path: '', component: ViewQuestsComponent },
    { path: 'view', component: ViewQuestsComponent },
    { path: 'add', component: QuestComponent },
    { path: 'edit-quest/:id', component: QuestComponent },
];
