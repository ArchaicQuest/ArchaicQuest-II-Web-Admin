import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { skillSpellsRoutes } from './skills-spells.routes';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ViewSkillSpellService } from './view-skills-spells/view-skills-spells.service';
import { ViewSkillsSpellsComponent } from './view-skills-spells/view-skills-spells.component';
import { AddSkillsSpellComponent } from './add-skills-spells/add-skills-spells.component';
import { SkillSpellService } from './add-skills-spells/add-skills-spells.service';
import { SpellPreviewComponent } from './spell-preview/spell-preview.component';
import { ValidTargetPipe } from './pipes/valid-target.pipe';



@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(skillSpellsRoutes),
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule,

    ],
    providers: [
        ViewSkillSpellService,
        SkillSpellService
    ],
    declarations: [
        ViewSkillsSpellsComponent,
        AddSkillsSpellComponent,
        SpellPreviewComponent,
        ValidTargetPipe
    ],
})
export class SkillsSpellsModule { }
