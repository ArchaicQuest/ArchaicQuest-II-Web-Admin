import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { MatPaginatorModule } from '@angular/material/paginator';
import { QuestService } from './quest.service';
import { QuestRoutes } from './quest.routes';
import { ViewQuestsComponent } from './view-quests/view-quests.component';
import { QuestComponent } from './quest.component';
import { MatSelectModule } from '@angular/material/select';
import { ItemSelectorComponent } from '../items/selectors/Item-selector/item-selector.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditQuestComponent } from './edit-quest/edit-quest.component';



@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(QuestRoutes),
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    providers: [
        QuestService,
    ],
    declarations: [
        QuestComponent,
        ViewQuestsComponent,
        EditQuestComponent

    ],
})
export class QuestModule { }
