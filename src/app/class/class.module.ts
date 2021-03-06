import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ViewClassService } from './view-class/view-class.service';
import { ViewClassComponent } from './view-class/view-class.component';
import { classRoutes } from './class.routes';
import { ClassService } from './add-class/add-class.service';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassPreviewComponent } from './class-preview/class-preview.component';
import { EditClassComponent } from './edit-class/edit-class.component';



@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(classRoutes),
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
        ViewClassService,
        ClassService

    ],
    declarations: [
        ViewClassComponent,
        ClassPreviewComponent,
        AddClassComponent,
        EditClassComponent
    ],
})
export class ClassModule { }
