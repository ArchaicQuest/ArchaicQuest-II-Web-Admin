import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MobService } from "./add-mob.service";
import { ActivatedRoute } from "@angular/router";


@Component({
    templateUrl: './add-mob.component.html',
})
export class AddMobComponent implements  OnInit {
  addMobForm: FormGroup;
 races: any;
 classes: any;
  constructor(
    private mobService: MobService,
    private route: ActivatedRoute
) { }

  ngOnInit() {
    this.addMobForm = this.mobService.getAddMobForm();
  }

  addMob() {

  }

}
