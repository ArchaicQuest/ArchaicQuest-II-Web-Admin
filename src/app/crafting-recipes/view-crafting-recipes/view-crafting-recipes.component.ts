import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

import { CraftingRecipesService } from '../crafting-recipes.service';
import { ICraftingRecipes } from '../crafting-recipes.interface';

@Component({
    templateUrl: './view-crafting-recipes.component.html',
    styleUrls: ['./view-crafting-recipes.component.scss']
})
export class ViewCraftingRecipesComponent extends DataListComponent implements OnInit {
    items: ICraftingRecipes[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private service: CraftingRecipesService, private toastr: ToastrService,
        public helpers: Shared) {
        super();
    }

    ngOnInit() {

        this.service.getCraftingRecipe().subscribe((items) => {
            this.data = items;
            this.filteredata = this.data;
        });
    }


    applyFilter(filterValue: string) {
        const result = this.data.filter(x => x.title.toLowerCase().includes(filterValue));
        this.filteredata = result;
    }



    delete(array: any[], index: number, id: number) {
        this.service.delete(id).pipe(take(1)).subscribe(deleted => {
            if (deleted) {
                this.helpers.removeItem(array, index);
                this.filteredata = [...array];

                this.toastr.success(deleted.toast);
            }
        });
    }

}
