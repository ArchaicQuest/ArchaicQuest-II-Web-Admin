import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Shared } from 'src/app/shared/shared';


@Component({
    selector: 'app-room-preview-component',
    templateUrl: './room-preview.component.html',
    styleUrls: ['../add-room/add-room.component.scss']
})

export class RoomPreviewComponent implements OnInit, OnDestroy {
    @Input() addRoomForm: FormGroup;
    @Input() exits: any;
    @Input() items: any;
    @Input() mobs: any;
    @Input() roomObjects: any;

    componentActive = true;

    constructor(
        public shared: Shared,

    ) { }


    ngOnInit() {

        console.log(this.addRoomForm);
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

}
