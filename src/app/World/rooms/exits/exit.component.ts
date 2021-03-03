import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Coords } from 'src/app/shared/interfaces/coords.interface';
import { Shared } from 'src/app/shared/shared';
import { RoomService } from '../add-room/add-room.service';
import { EditRoomService } from '../edit-room/edit-room.service';
import { Exit } from '../interfaces/exit.interface';
import { Room } from '../interfaces/room.interface';
import { RoomExit } from '../interfaces/roomExit.interface';
import { ManageExitsComponent } from '../shared/room-exits/manage-exits.component';
import { RoomExitService } from '../shared/room-exits/manage-exits.service';


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

export class ExitComponent implements OnInit, OnDestroy, AfterContentInit {
    @Input() addRoomForm: FormGroup;
    @Output() exitValueChange = new EventEmitter();
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
    enableInvalidExits: false;

    northWestValid: false;
    northWestValidExit = false;
    northValidExit = false;
    northEastValidExit = false;
    eastValidExit = false;
    southEastValidExit = false;
    southValidExit = false;
    southWestValidExit = false;
    westValidExit = false;
    isMobileLayout = false;
    constructor(
        private roomServices: RoomService,
        private editRoomService: EditRoomService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public shared: Shared,
        private exitService: RoomExitService,
        private controlContainer: ControlContainer,
    ) { }


    ngOnInit() {
        this.addRoomForm = <FormGroup>this.controlContainer.control;

        this.roomId = this.route.snapshot.params['roomId'];

        this.isMobileLayout = window.innerWidth <= 425;

        window.onresize = () => this.isMobileLayout = window.innerWidth <= 425;

    }

    ngAfterContentInit() {

        if (this.roomId != null) {
            this.editRoomService.getRoom(+this.roomId).subscribe((value: Room) => {

                this.exits = value.exits;

                this.areaId = value.areaId;

                this.coords = {
                    x: value.coords.x,
                    y: value.coords.y,
                    z: value.coords.z
                };


                this.addRoomForm.get('CoordX').setValue(value.coords.x);
                this.addRoomForm.get('CoordY').setValue(value.coords.y);
                this.addRoomForm.get('CoordZ').setValue(value.coords.z);

                if (value.exits.north) {
                    this.addRoomForm.get('exits.north').setValue(value.exits.north);
                }
                if (value.exits.northEast) {
                    this.addRoomForm.get('exits.northEast').setValue(value.exits.northEast);
                }
                if (value.exits.east) {
                    this.addRoomForm.get('exits.east').setValue(value.exits.east);
                }
                if (value.exits.southEast) {
                    this.addRoomForm.get('exits.southEast').setValue(value.exits.southEast);
                }
                if (value.exits.south) {
                    this.addRoomForm.get('exits.south').setValue(value.exits.south);
                }
                if (value.exits.southWest) {
                    this.addRoomForm.get('exits.southWest').setValue(value.exits.southWest);
                }
                if (value.exits.west) {
                    this.addRoomForm.get('exits.west').setValue(value.exits.west);
                }
                if (value.exits.northWest) {
                    this.addRoomForm.get('exits.northWest').setValue(value.exits.northWest);
                }
                if (value.exits.up) {
                    this.addRoomForm.get('exits.up').setValue(value.exits.up);
                }
                if (value.exits.down) {
                    this.addRoomForm.get('exits.down').setValue(value.exits.down);
                }

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
        } else {
            this.areaId = this.route.snapshot.params['id'],
                this.coords = {
                    x: this.route.snapshot.params['x'],
                    y: this.route.snapshot.params['y'],
                    z: this.route.snapshot.params['z']
                };



            this.addRoomForm.get('CoordX').setValue(this.coords.x);
            this.addRoomForm.get('CoordY').setValue(this.coords.y);
            this.addRoomForm.get('CoordZ').setValue(this.coords.z);

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
        }


        console.log(this.southValidExit);
    }

    displayCoord(direction: string) {
        const coords = this.exitService.setExitCoord(direction, this.coords);
        const exitCoord = this.exits[direction.toLowerCase()] as Exit;

        if (exitCoord != null) {
            return `(${exitCoord.areaId}, ${exitCoord.coords.x}, ${exitCoord.coords.y}, ${exitCoord.coords.z})`;
        }
        return `(${this.areaId}, ${coords.x}, ${coords.y}, ${coords.z})`;

    }

    isExitValid(direction: string): Observable<string> {
        const coords = this.exitService.setExitCoord(direction, this.coords);

        return this.roomServices.isValidExit(coords.x, coords.y, coords.z, this.areaId);
    }

    enableInvalidRooms(evt) {
        this.enableInvalidExits = evt.checked;
    }



    openExitDialog(exitDirection: string): void {

        let exit = exitDirection.split(' ');
        let exit2 = exit.length >= 2 ? exit[1] : '';

        let exitKey = exit[0].toLowerCase() + exit2;



        const dialogRef = this.dialog.open(ManageExitsComponent, {
            width: '450px',
            data: {
                exit: exitDirection,
                currentCoord: this.coords,
                exitAreaId: this.addRoomForm.get(`exits.${exitKey}`).value?.areaId || this.areaId,
                areaId: this.areaId,
                obj: this.exits[exitDirection.toLowerCase()]
            }
        });



        dialogRef.afterClosed().subscribe((result: Exit) => {
            if (result == null) {
                return;
            }

            if (Object.prototype.hasOwnProperty.call((result as any), 'exit')) {

                switch ((result as any).exit.name) {
                    case 'North':
                        this.exits.north = null;
                        this.addRoomForm.get('exits.north').setValue(null);
                        break;
                    case 'North East':
                        this.exits.northEast = null;
                        this.addRoomForm.get('exits.northEast').setValue(null);
                        break;
                    case 'East':
                        this.exits.east = null;
                        this.addRoomForm.get('exits.east').setValue(null);
                        break;
                    case 'South East':
                        this.exits.southEast = null;
                        this.addRoomForm.get('exits.southEast').setValue(null);
                        break;
                    case 'South':
                        this.exits.south = null;
                        this.addRoomForm.get('exits.south').setValue(null);
                        break;
                    case 'South West':
                        this.exits.southWest = null;
                        this.addRoomForm.get('exits.southWest').setValue(null);
                        break;
                    case 'West':
                        this.exits.west = null;
                        this.addRoomForm.get('exits.west').setValue(null);
                        break;
                    case 'North West':
                        this.exits.northWest = null;
                        this.addRoomForm.get('exits.northWest').setValue(null);
                        break;
                    case 'Up':
                        this.exits.up = null;
                        this.addRoomForm.get('exits.up').setValue(null);
                        break;
                    case 'Down':
                        this.exits.down = null;
                        this.addRoomForm.get('exits.down').setValue(null);
                        break;
                }

                this.exitValueChange.emit(this.exits);
                return;
            }

            switch (result.name) {
                case 'North':
                    this.exits.north = result;
                    this.addRoomForm.get('exits.north').setValue(result);
                    break;
                case 'North East':
                    this.exits.northEast = result;
                    this.addRoomForm.get('exits.northEast').setValue(result);
                    break;
                case 'East':
                    this.exits.east = result;
                    this.addRoomForm.get('exits.east').setValue(result);
                    break;
                case 'South East':
                    this.exits.southEast = result;
                    this.addRoomForm.get('exits.southEast').setValue(result);
                    break;
                case 'South':
                    this.exits.south = result;
                    this.addRoomForm.get('exits.south').setValue(result);
                    break;
                case 'South West':
                    this.exits.southWest = result;
                    this.addRoomForm.get('exits.southWest').setValue(result);
                    break;
                case 'West':
                    this.exits.west = result;
                    this.addRoomForm.get('exits.west').setValue(result);
                    break;
                case 'North West':
                    this.exits.northWest = result;
                    this.addRoomForm.get('exits.northWest').setValue(result);
                    break;
                case 'Up':
                    this.exits.up = result;
                    this.addRoomForm.get('exits.up').setValue(result);
                    break;
                case 'Down':
                    this.exits.down = result;
                    this.addRoomForm.get('exits.down').setValue(result);
                    break;
            }


            // Subscribed in the add-room component
            this.exitValueChange.emit(this.exits);
        });
    }



    // tslint:disable-next-line:use-life-cycle-interface


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
