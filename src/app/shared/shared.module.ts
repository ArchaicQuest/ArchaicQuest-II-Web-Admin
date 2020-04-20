import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "../header/header.component";
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
    declarations: [HeaderComponent, DashboardComponent],
    imports: [CommonModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent]
})
export class SharedModule { }
