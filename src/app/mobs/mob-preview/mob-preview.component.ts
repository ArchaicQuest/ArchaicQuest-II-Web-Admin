import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    ChangeDetectorRef,
    DoCheck,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { CharacterAppState } from 'src/app/characters/state/character.state';
import { getInventory } from 'src/app/characters/state/character.selector';
import { takeUntil, filter } from 'rxjs/operators';
import { componentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { Item } from 'src/app/items/interfaces/item.interface';
import { Equipment } from 'src/app/characters/interfaces/equipment.interface';


@Component({
    selector: 'app-mob-preview-component',
    templateUrl: './mob-preview.component.html',
    styleUrls: ['./mob-preview.component.scss']
})

export class MobPreviewComponent extends OnDestroyMixin implements OnInit, OnDestroy, DoCheck, OnChanges {
    @Input() mobForm: FormGroup;
    componentActive = true;
    equipped: Equipment;


    constructor(private _changeRef: ChangeDetectorRef,
        private store: Store<CharacterAppState>,
    ) { super(); }


    ngOnInit() {

        this.store
            .pipe(
                select(getInventory),
                filter((val) => val != null),
                takeUntil(componentDestroyed(this))
            )
            .subscribe((inventory: Item[]) => {
                console.log(inventory);

            });


        this.store
            .pipe(
                select(x => x.character.mob.equipped),
                takeUntil(componentDestroyed(this))
            ).subscribe(x => {
                this.equipped = x;
                console.log("xxx", this.equipped)
            });
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.mobForm = null;
        this._changeRef.detach();
    }

    ngDoCheck() {
        if (!this._changeRef['destroyed']) {
            this._changeRef.markForCheck();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.mobForm = changes['mobForm'].currentValue;

    }



}
