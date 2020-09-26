import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { socials } from './socials.interface';
import { SocialsService } from './socials.service';

@Component({
    templateUrl: './socials.component.html',
    styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {

    public socialsForm: FormGroup;

    constructor(private service: SocialsService, private formBuilder: FormBuilder, private toast: ToastrService) {
    }

    ngOnInit() {
        this.socialsForm = this.formBuilder.group({
            CharNoTarget: "",
            RoomNoTarget: "",
            TargetFound: "",
            RoomTarget: "",
            ToTarget: "",
            TargetSelf: "",
            RoomSelf: "",
        });


        this.service.getSocials().pipe(take(1)).subscribe((val: socials) => {
            this.socialsForm.get('CharNoTarget').setValue(val.CharNoTarget);
            this.socialsForm.get('RoomNoTarget').setValue(val.RoomNoTarget);
            this.socialsForm.get('TargetFound').setValue(val.TargetFound);
            this.socialsForm.get('RoomTarget').setValue(val.RoomTarget);
            this.socialsForm.get('ToTarget').setValue(val.ToTarget);
            this.socialsForm.get('TargetSelf').setValue(val.TargetSelf);
            this.socialsForm.get('RoomSelf').setValue(val.RoomSelf);
        });

    }

    updateSettings() {
        const socials: socials = {
            CharNoTarget: this.socialsForm.get('CharNoTarget').value,
            RoomNoTarget: this.socialsForm.get('RoomNoTarget').value,
            TargetFound: this.socialsForm.get('TargetFound').value,
            RoomTarget: this.socialsForm.get('RoomTarget').value,
            ToTarget: this.socialsForm.get('ToTarget').value,
            TargetSelf: this.socialsForm.get('TargetSelf').value,
            RoomSelf: this.socialsForm.get('RoomSelf').value,

        };

        this.service.updateSettings(socials).pipe(take(1)).subscribe(response => {
            this.toast.success(`Social Updated Successfully.`);
        },
            err => console.log(err));

    }


}
