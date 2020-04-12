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
import { componentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Item } from 'src/app/items/interfaces/item.interface';


@Component({
    selector: 'app-mob-preview-component',
    templateUrl: './mob-preview.component.html',
    styleUrls: ['./mob-preview.component.scss']
})

export class MobPreviewComponent implements OnInit, OnDestroy, DoCheck, OnChanges {
    @Input() mobForm: FormGroup;
    componentActive = true;

    constructor(private _changeRef: ChangeDetectorRef,
        private store: Store<CharacterAppState>,
    ) { }


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
