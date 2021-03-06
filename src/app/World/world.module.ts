import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { worldRoutes } from './world.routes';
import { SharedModule } from '../shared/shared.module';
import { AreaService } from './area/add-area/add-area.service';
import { AddAreaComponent } from './area/add-area/add-area.component';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { RoomService } from './rooms/add-room/add-room.service';
import { ViewAreasComponent } from './area/view-areas/view-areas.component';
import { EditAreaComponent } from './area/edit-area/edit-area.component';
import { EditService } from './area/edit-area/edit-area.service';
import { ViewAreaComponent } from './area/view-area/view-area.component';
import { ViewAreaService } from './area/view-area/view-area.service';
import { ItemSelectorComponent } from '../items/selectors/Item-selector/item-selector.component';
import { ItemService } from '../items/add-item/add-item.service';
import { ManageContainerItemsComponent } from './rooms/shared/manage-container-items/manage-container-items.component';
import { MobSelectorComponent } from '../mobs/mob-selector/mob-selector.component';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { RoomExitService } from './rooms/shared/room-exits/manage-exits.service';
import { ManageRoomItemsComponent } from './rooms/shared/manage-items/add/manage-room-items.component';
import { ManageRoomMobsComponent } from './rooms/shared/manage-mob/add/manage-room-mobs.component';
import { RoomMobListComponent } from './rooms/shared/manage-mob/list/room-mob-list.component';
import { RoomItemListComponent } from './rooms/shared/manage-items/list/room-item-list.component';
import { ManageMobComponent } from './rooms/shared/manage-mob/manage-mob.component';
import { ManageExitsComponent } from './rooms/shared/room-exits/manage-exits.component';
import { EditRoomService } from './rooms/edit-room/edit-room.service';
import { ExitComponent } from './rooms/exits/exit.component';
import { RoomPreviewComponent } from './rooms/room-preview/room-preview.component';
import { ManageContainerComponent } from './rooms/shared/manage-container/manage-container.component';
import { ManageInventoryComponent } from './rooms/shared/manage-mob/manage-inventory/manage-inventory.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { hasNorthExitPipe, hasNorthEastExitPipe, hasEastExitPipe, hasSouthEastExitPipe, hasSouthExitPipe, hasSouthWestExitPipe, hasWestExitPipe, hasNorthWestExitPipe, isRoomPipe, setRoomClassPipe } from './rooms/pipes/valid-exit.pipe';
import { CodeEditorModule } from '@ngstack/code-editor';
import { EditObjectJsonComponent } from './rooms/shared/edit-object-json/edit-object-json.component';



@NgModule({
    imports: [
        SharedModule,
        //  ReactiveFormsModule,
        RouterModule.forChild(worldRoutes),
        // StoreModule.forFeature('character', characterReducer),
        // EffectsModule.forFeature([CharacterEffects]),
        //  ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        CodeEditorModule.forChild()
    ],
    providers: [
        AreaService,
        ViewAreaService,
        EditService,
        EditRoomService,
        RoomService,
        ItemService,
        RoomExitService
    ],
    entryComponents: [ManageContainerItemsComponent, ManageRoomItemsComponent, ManageRoomMobsComponent, RoomMobListComponent,
        RoomItemListComponent, ManageMobComponent, ManageExitsComponent, ManageContainerComponent, ManageInventoryComponent],
    declarations: [
        AddAreaComponent,
        AddRoomComponent,
        EditRoomComponent,
        ViewAreasComponent,
        ViewAreaComponent,
        EditAreaComponent,
        EditObjectJsonComponent,
        //MobSelectorComponent,
        ManageContainerItemsComponent,
        ManageContainerComponent,
        ManageInventoryComponent,
        ManageMobComponent,
        ManageExitsComponent,
        RoomItemListComponent,
        ManageRoomItemsComponent,
        ManageRoomMobsComponent,
        RoomMobListComponent,
        ExitComponent,
        RoomPreviewComponent,
        hasNorthExitPipe,
        hasNorthEastExitPipe,
        hasEastExitPipe,
        hasSouthEastExitPipe,
        hasSouthExitPipe,
        hasSouthWestExitPipe,
        hasWestExitPipe,
        hasNorthWestExitPipe,
        isRoomPipe,
        setRoomClassPipe

    ],
})
export class WorldModule { }
