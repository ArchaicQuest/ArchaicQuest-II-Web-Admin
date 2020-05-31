import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "../header/header.component";
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { LineTruncationLibModule } from 'ngx-line-truncation';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, LineTruncationLibModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, LineTruncationLibModule]
})
export class SharedModule { }
