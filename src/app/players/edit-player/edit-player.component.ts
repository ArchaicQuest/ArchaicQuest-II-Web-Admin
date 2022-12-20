import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EquipmentComponent } from '../../characters/equipment/equipment.component';
import { Alignment } from '../../characters/interfaces/alignment.interface';
import { Class } from '../../characters/interfaces/class.interface';
import { Gender } from '../../characters/interfaces/gender.interface';
import { Race } from '../../characters/interfaces/race.interface';
import { Status } from '../../characters/interfaces/status.interface';
import { AddToInventory, ClearInventory, RemoveFromInventory, SaveChar } from '../../characters/state/character.actions';
import { CharacterAppState } from '../../characters/state/character.state';
import { Item } from '../../items/interfaces/item.interface';
import { Option } from '../../shared/interfaces/option.interface';
import { getAC } from 'src/app/characters/state/character.selector';
import { CodeModel } from '@ngstack/code-editor';
import { SpellList } from 'src/app/characters/interfaces/characters.interface';
import { ViewPlayerService } from '../view-players/view-players.service';
import { ViewMobService } from 'src/app/mobs/view-mobs/view-mobs.service';
import { EditMobService } from '../../mobs/edit-mob/edit-mob.service';
import { Player } from 'src/app/mobs/interfaces/mob.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
    templateUrl: './edit-player.component.html',
    styleUrls: ['../../mobs/mob.component.scss']
})
export class EditPlayerComponent extends OnDestroyMixin implements OnInit, OnDestroy {
    playerForm: FormGroup;
    races: Race[];
    classes: Class[];
    genders: Gender[];
    alignments: Alignment[];
    statuses: Status[];
    attackTypes: Option[];
    inventoryItems: Item[] = [];
    filteredItems: Observable<Item[]>;
    emotes: string[] = [''];
    spellList: SpellList[] = [];
    currentAlignment: any;
    panelOpenState = false;
    loaded = false;
    theme = 'vs-dark';
    commandLog = [];
    playerObj: Player = null;
    constructor(
        private playerService: ViewPlayerService,
        private mobService: EditMobService,
        private store: Store<CharacterAppState>,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private toast: ToastrService
    ) { super(); }
    @ViewChild(EquipmentComponent) equipmentComponent: EquipmentComponent;
    @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;

    itemModel: CodeModel = {
        language: 'json',
        uri: 'json.json',
        value: '',
    };
    options = {
        contextmenu: true,
        minimap: {
            enabled: false,
        },
    };

    ngOnInit() {



        this.playerForm = this.formBuilder.group({
           
            name: ['', Validators.required],
            description: ['', Validators.required],
            enterEmote: [''],
            leaveEmote: [''],
            userRole: [''],

        });


        setTimeout(() => {


            this.playerService.getPlayer(this.route.snapshot.params['id']).pipe(
                takeUntil(componentDestroyed(this))
            ).subscribe(mob => {

                this.playerObj = mob;

               // this.itemModel.value = JSON.stringify(mob, null, 4)

                this.loaded = true;

                this.commandLog = mob.commandLog;
                this.playerForm.patchValue({
                    description: mob.description,
                    name: mob.name,
                    enterEmote: mob.enterEmote,
                    leaveEmote: mob.leaveEmote,
                    userRole: mob.userRole.toString(),
                });

            });


        });
       
         setTimeout(() => {
            this.playerForm.updateValueAndValidity();
      
      console.log(this.playerForm.getRawValue())
            this.findInvalidControls();
          });

          this.playerForm.get('name').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(val => {
      
            this.playerObj.name = val
    
            this.itemModel = JSON.parse(JSON.stringify(this.itemModel));
            this.itemModel.value = JSON.stringify(this.playerObj, null, 4);
            
          });

          this.playerForm.get('description').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(val => {
      
            this.playerObj.description = val
    
            this.itemModel = JSON.parse(JSON.stringify(this.itemModel));
            this.itemModel.value = JSON.stringify(this.playerObj, null, 4);
            
          });
      
          this.playerForm.get('enterEmote').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(val => {
      
            this.playerObj.enterEmote = val
    
            this.itemModel = JSON.parse(JSON.stringify(this.itemModel));
            this.itemModel.value = JSON.stringify(this.playerObj, null, 4);
            
          });

               
          this.playerForm.get('leaveEmote').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(val => {
      
            this.playerObj.leaveEmote = val
    
            this.itemModel = JSON.parse(JSON.stringify(this.itemModel));
            this.itemModel.value = JSON.stringify(this.playerObj, null, 4);
            
          });

                         
          this.playerForm.get('userRole').valueChanges.pipe(
            takeUntil(componentDestroyed(this))
        ).subscribe(val => {
      
            this.playerObj.userRole = +val
    
            this.itemModel = JSON.parse(JSON.stringify(this.itemModel));
            this.itemModel.value = JSON.stringify(this.playerObj, null, 4);
            
          });
    }

   
    ngOnDestroy(): void {

        this.store.dispatch(new ClearInventory());
    }

    onCodeChanged(value) {
      
       this.playerObj = JSON.parse(value)
    }


    triggerDescriptionResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable
            .pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    editPlayer() {

 
        let playerData = JSON.stringify(this.playerObj);

            this.playerService.savePlayerEdit(playerData).pipe(take(1)).subscribe((x) => {
           
                if(x != null) {
                this.toast.success(`Player updated successfully.`);
                }
                else {
                    this.toast.error(`Something went wrong.`);
                }
            }
            )
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.playerForm.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            invalid.push(name);
          }
        }
        console.log('invalid:', invalid);
      }




}
