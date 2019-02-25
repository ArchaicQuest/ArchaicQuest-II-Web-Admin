import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  OnDestroy,
  Input
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Item } from "src/app/items/interfaces/item.interface";

@Component({
  selector: "app-armour-class",
  templateUrl: "./armour-class.component.html"
})
export class ArmourClassComponent implements OnInit {
  Defense = 0;
  magicDefense = 0;

  @Input() equipment: FormGroup;

  constructor() {}

  ngOnInit() {
    this.equipment.get("headEq").valueChanges.subscribe((value: Item) => {
      if (value != null) {
        this.Defense = value.armourRating.armour;
      } else {
        this.Defense = 0;
      }
    });

    // this.Defense = (this.equipment.get('headEq').value as Item).armourRating.armour;
  }
}
