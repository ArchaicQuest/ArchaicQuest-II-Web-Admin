import {
    Component,
    OnInit,
    ViewChild,
    NgZone,
    OnDestroy,
    ChangeDetectorRef,
    Input,
    AfterViewInit,
    AfterContentInit
} from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    ControlContainer
} from '@angular/forms';
import { RoomService } from '../add-room/add-room.service';
import { ActivatedRoute } from '@angular/router';
import {
    MatDialog,
} from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import { Exit } from '../interfaces/exit.interface';
import { RoomExit } from '../interfaces/roomExit.interface';
import { Room } from '../interfaces/room.interface';
import { Shared } from 'src/app/shared/shared';
import { ManageExitsComponent } from '../shared/room-exits/manage-exits.component';

import { RoomExitService } from '../shared/room-exits/manage-exits.service';
import { Observable } from 'rxjs';
import { EditRoomService } from '../edit-room/edit-room.service';

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

        console.log(this.addRoomForm)
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

}
