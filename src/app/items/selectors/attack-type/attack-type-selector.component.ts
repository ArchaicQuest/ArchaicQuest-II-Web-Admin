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
  FormBuilder
} from "@angular/forms";
import { ItemType } from "../../interfaces/item-type.interface";
import { Store, select } from "@ngrx/store";
import { ItemAppState } from "../../state/add-item.state";
import { getWeaponTypes, getAttackTypes } from "../../state/add-item.selector";
import { takeWhile } from "rxjs/operators";
import { GetWeaponTypes, GetAttackTypes } from "../../state/add-item.actions";
import { BaseSelectorComponent } from "../base-selector.component";

@Component({
  selector: "app-attack-type-selector",
  templateUrl: "./attack-type-selector.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttackTypeSelectorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AttackTypeSelectorComponent),
      multi: true
    }
  ]
})
export class AttackTypeSelectorComponent extends BaseSelectorComponent
  implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  componentActive = true;
  attackTypes: ItemType[];
  @Input() currentValue = "";

  constructor(private store: Store<ItemAppState>, private fb: FormBuilder) {
    super();

    this.formGroup = this.fb.group({
      attackType: this.control
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateFormControl('attackType', changes);
  }

  ngOnInit() {
    this.store.dispatch(new GetAttackTypes());

    this.store
      .pipe(
        select(getAttackTypes),
        takeWhile(() => this.componentActive)
      )
      .subscribe((attackTypes: any) => {
        this.attackTypes = attackTypes;
        this.control.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
