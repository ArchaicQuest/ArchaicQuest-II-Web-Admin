import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "../header/header.component";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { Helpers } from './helpers/helpers';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, Helpers],
    exports: [CommonModule, Helpers, FormsModule, ReactiveFormsModule, HeaderComponent]
})
export class SharedModule { }
