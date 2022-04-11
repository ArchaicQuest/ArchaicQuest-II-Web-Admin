import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Mob, Player } from '../../mobs/interfaces/mob.interface';
import { ViewPlayerService } from './view-players.service';
import { DataListComponent } from 'src/app/shared/components/data-list/data-list.component';
import { Shared } from 'src/app/shared/shared';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './view-players.component.html',
    styleUrls: ['./view-players.component.scss']
})
export class ViewPlayersComponent extends DataListComponent implements OnInit {
    items: Player[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private viewPlayerService: ViewPlayerService, private toastr: ToastrService,
        public helpers: Shared, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        setTimeout(() => {

            this.viewPlayerService.getPlayers(this.route.snapshot.params['id']).subscribe((items) => {
                this.data = items;
                this.filteredata = this.data;
            });

        })
    }


    applyFilter(filterValue: string) {

        const result = this.data.filter(x => x.name.toLowerCase().includes(filterValue));

        this.filteredata = result;
    }



    // delete(array: any[], index: number, id: number) {
    //     this.√.delete(id).pipe(take(1)).subscribe(deleted => {
    //         if (deleted) {
    //             this.helpers.removeItem(array, index);
    //             this.filteredata = [...array];

    //             this.toastr.success(deleted.toast);
    //         }
    //     });
    // }

}
