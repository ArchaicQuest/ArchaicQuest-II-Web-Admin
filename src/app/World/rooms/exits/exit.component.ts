import {
    Component,
    OnInit,
    ViewChild,
    NgZone,
    OnDestroy,
    ChangeDetectorRef,
    Input
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
    selector: 'app-exit-component',
    templateUrl: './exit.component.html',
    styleUrls: ['../add-room/add-room.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
        ])
    ]
})

export class ExitComponent implements OnInit, OnDestroy {
    @Input() addRoomForm: FormGroup;
    componentActive = true;
    id: number;
    areaId: number;
    roomId: number;
    coords: Coords;
    exits: RoomExit = {
        north: null,
        down: null,
        east: null,
        northEast: null,
        northWest: null,
        south: null,
        southEast: null,
        southWest: null,
        up: null,
        west: null
    };

    northWestValid: false;
    northWestValidExit = false;
    northValidExit = false;
    northEastValidExit = false;
    eastValidExit = false;
    southEastValidExit = false;
    southValidExit = false;
    southWestValidExit = false;
    westValidExit = false;

    constructor(
        private roomServices: RoomService,
        private editRoomService: EditRoomService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public shared: Shared,
        private exitService: RoomExitService,
        private controlContainer: ControlContainer
    ) { }


    ngOnInit() {
        this.addRoomForm = <FormGroup>this.controlContainer.control;
        console.log(this.route.snapshot.params);
        this.id = this.route.snapshot.params['id'];
        this.roomId = this.route.snapshot.params['id'];


        if (this.roomId != null) {
            this.editRoomService.getRoom(this.roomId).subscribe((value: Room) => {
                this.exits = value.exits;

                this.areaId = value.areaId;

                this.coords = {
                    x: value.coords.x,
                    y: value.coords.y,
                    z: value.coords.z
                };

                console.log('real', this.coords);

                this.addRoomForm.get('CoordX').setValue(value.coords.x);
                this.addRoomForm.get('CoordY').setValue(value.coords.y);
                this.addRoomForm.get('CoordZ').setValue(value.coords.z);

                // if (value.exits.north) {
                //     this.addRoomForm.get('north').setValue(value.exits.north);
                // }
                // if (value.exits.northWest) {
                //     this.addRoomForm.get('northEast').setValue(value.exits.northWest);
                // }
                // if (value.exits.east) {
                //     this.addRoomForm.get('east').setValue(value.exits.east);
                // }
                // if (value.exits.southEast) {
                //     this.addRoomForm.get('southEast').setValue(value.exits.southEast);
                // }
                // if (value.exits.south) {
                //     this.addRoomForm.get('south').setValue(value.exits.south);
                // }
                // if (value.exits.southWest) {
                //     this.addRoomForm.get('southWest').setValue(value.exits.southWest);
                // }
                // if (value.exits.west) {
                //     this.addRoomForm.get('west').setValue(value.exits.west);
                // }
                // if (value.exits.northWest) {
                //     this.addRoomForm.get('northWest').setValue(value.exits.northWest);
                // }
                // if (value.exits.up) {
                //     this.addRoomForm.get('up').setValue(value.exits.up);
                // }
                // if (value.exits.down) {
                //     this.addRoomForm.get('down').setValue(value.exits.down);
                // }


                this.isExitValid('North West').subscribe({
                    next: res => {
                        this.northWestValidExit = res === 'true';
                    }
                });
                this.isExitValid('North').subscribe({
                    next: res => {
                        this.northValidExit = res === 'true';
                    }
                });
                this.isExitValid('North East').subscribe({
                    next: res => {
                        this.northEastValidExit = res === 'true';
                    }
                });

                this.isExitValid('East').subscribe({
                    next: res => {
                        this.eastValidExit = res === 'true';
                    }
                });

                this.isExitValid('South East').subscribe({
                    next: res => {
                        this.southEastValidExit = res === 'true';
                    }
                });

                this.isExitValid('South').subscribe({
                    next: res => {
                        this.southValidExit = res === 'true';
                    }
                });

                this.isExitValid('South West').subscribe({
                    next: res => {
                        this.southWestValidExit = res === 'true';
                    }
                });

                this.isExitValid('West').subscribe({
                    next: res => {
                        this.westValidExit = res === 'true';
                    }
                });
            });
        }
        console.log(this.southValidExit);
    }

    isExitValid(direction: string): Observable<string> {
        const coords = this.exitService.setExitCoord(direction, this.coords);
        return this.roomServices.isValidExit(coords.x, coords.y, coords.z, 1);
    }



    openExitDialog(exitDirection: string): void {
        const dialogRef = this.dialog.open(ManageExitsComponent, {
            width: '450px',
            data: {
                exit: exitDirection,
                currentCoord: this.coords,
                areaId: this.areaId
            }
        });

        dialogRef.afterClosed().subscribe((result: Exit) => {
            if (result == null) {
                return;
            }

            switch (result.name) {
                case 'North':
                    this.exits.north = result;
                    this.addRoomForm.get('north').setValue(result);
                    break;
                case 'North East':
                    this.exits.northEast = result;
                    this.addRoomForm.get('northEast').setValue(result);
                    break;
                case 'East':
                    this.exits.east = result;
                    this.addRoomForm.get('east').setValue(result);
                    break;
                case 'South East':
                    this.exits.southEast = result;
                    this.addRoomForm.get('southEast').setValue(result);
                    break;
                case 'South':
                    this.exits.south = result;
                    this.addRoomForm.get('south').setValue(result);
                    break;
                case 'South West':
                    this.exits.southWest = result;
                    this.addRoomForm.get('southWest').setValue(result);
                    break;
                case 'West':
                    this.exits.west = result;
                    this.addRoomForm.get('west').setValue(result);
                    break;
                case 'North West':
                    this.exits.northWest = result;
                    this.addRoomForm.get('northWest').setValue(result);
                    break;
                case 'Up':
                    this.exits.up = result;
                    this.addRoomForm.get('up').setValue(result);
                    break;
                case 'Down':
                    this.exits.down = result;
                    this.addRoomForm.get('down').setValue(result);
                    break;
            }

            console.log('exit ', this.exits);
            console.log(result);
        });
    }



    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        //this.dataSource = this.items;
        // If the user changes the sort order, reset back to the first page.
        //  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    }

    removeExit(control: AbstractControl) {
        control.setValue('');
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.roomServices.clearCache();
        this.exits = {
            north: null,
            down: null,
            east: null,
            northEast: null,
            northWest: null,
            south: null,
            southEast: null,
            southWest: null,
            up: null,
            west: null
        };
    }

}
