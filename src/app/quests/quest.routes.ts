import { Routes } from '@angular/router';
import { AuthGuard } from '../account/auth-guard.service';
import { EditQuestComponent } from './edit-quest/edit-quest.component';
import { QuestComponent } from './quest.component';
import { ViewQuestsComponent } from './view-quests/view-quests.component';

export const QuestRoutes: Routes = [
    { path: '', component: ViewQuestsComponent, canActivate: [AuthGuard] },
    { path: 'view', component: ViewQuestsComponent, canActivate: [AuthGuard] },
    { path: 'add', component: QuestComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditQuestComponent, canActivate: [AuthGuard] },
];
