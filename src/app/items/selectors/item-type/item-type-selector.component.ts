import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  forwardRef,
  OnChanges,
  SimpleChanges
} from "@angular/core";

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormBuilder,
  ControlContainer,
  NgForm
} from "@angular/forms";
import { ItemType } from "../../interfaces/item-type.interface";
import { Store, select } from "@ngrx/store";
import { ItemAppState } from "../../state/add-item.state";
import { getWeaponTypes, getItemTypes } from "../../state/add-item.selector";
import { takeWhile } from "rxjs/operators";
import { GetItemTypes } from "../../state/add-item.actions";
import { BaseSelectorComponent } from "../base-selector.component";

@Component({
  selector: "app-item-type-selector",
  templateUrl: './item-type-selector.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ItemTypeSelectorComponent),
          multi: true
      },
      {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => ItemTypeSelectorComponent),
          multi: true
      }
  ]
})
export class ItemTypeSelectorComponent extends BaseSelectorComponent
  implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  componentActive = true;
  itemTypes: ItemType[];
  @Input() currentValue = "";

  constructor(private store: Store<ItemAppState>, private fb: FormBuilder) {
      super();

      this.formGroup = this.fb.group({
        itemType: this.control
      });
  }

  ngOnChanges(changes: SimpleChanges) {
      this.updateFormControl('itemType', changes);
  }

  ngOnInit() {
      this.store.dispatch(new GetItemTypes());

      this.store
          .pipe(
              select(getItemTypes),
              takeWhile(() => this.componentActive)
          )
          .subscribe((itemTypes: any) => {
              this.itemTypes = itemTypes;
              this.control.updateValueAndValidity();
          });
  }

  ngOnDestroy(): void {
      this.componentActive = false;
  }
}

