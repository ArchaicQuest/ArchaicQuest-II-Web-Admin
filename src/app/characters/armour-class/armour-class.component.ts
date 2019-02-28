import {
  Component,
  OnInit,
  OnDestroy,
  Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Item } from 'src/app/items/interfaces/item.interface';

@Component({
  selector: 'app-armour-class',
  templateUrl: './armour-class.component.html'
})
export class ArmourClassComponent implements OnInit {
  Defense = 0;
  magicDefense = 0;

  @Input() equipment: FormGroup;

  constructor() {}

  ngOnInit() {
   this.subscribeToEQChanges();

  }

  subscribeToEQChanges(): void {
    this.equipment.get('lightEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('headEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('neck2Eq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('bodyEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('torsoEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('waistEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('legsEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('armsEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('wristEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('wristEq2').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('fingerEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('finger2Eq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('heldEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('shieldEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('wieldEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('sheathedEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

    this.equipment.get('floatingEq').valueChanges.subscribe((value: Item) => {
      this.setArmourRating(value);
    });

  }

  private setArmourRating(value: Item): void {
    if (value != null) {
      this.Defense += value.armourRating.armour;
      this.magicDefense += value.armourRating.magic;
    }

  }
}
