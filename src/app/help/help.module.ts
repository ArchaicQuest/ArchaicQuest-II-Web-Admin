import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';;
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { helpRoutes } from './help.routes';
import { HelpService } from './add-help/add-help.service';
import { AddHelpComponent } from './add-help/add-help.component';
import { EditHelpComponent } from './edit-help/edit-help.component';
import { ViewHelpComponent } from './view-help/view-help.component';
import { HelpPreviewComponent } from './help-preview/help-preview.component';



@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(helpRoutes),
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
        HelpService
    ],
    declarations: [
        AddHelpComponent,
        EditHelpComponent,
        ViewHelpComponent,
        HelpPreviewComponent

    ],
})
export class HelpModule { }
