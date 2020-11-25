import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { User } from '../interface/user.interface';

@Component({
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageAccountsComponent implements OnInit {

    public addAccountForm: FormGroup;
    public users: User[];
    public displayedColumns: string[] = ['id', 'username', 'actions'];
    public dataSource: User[];

    constructor(private formBuilder: FormBuilder, private toast: ToastrService, private service: AccountService) {
    }

    ngOnInit() {
        this.addAccountForm = this.formBuilder.group({
            username: [''],
            password: [''],
            role: [''],

        });

        this.service.getUsers().pipe(take(1)).subscribe((users) => {
            this.users = users;
            this.dataSource = users;
        })



    }

    addUser() {
        // const settings: Settings = {
        //     id: 1,
        //     doubleXp: this.settingsForm.get('doubleXp').value,
        //     doubleGains: this.settingsForm.get('doubleGains').value,
        //     doubleQuestPoints: this.settingsForm.get('doubleQp').value,
        //     pkAllowed: this.settingsForm.get('pk').value,
        //     playerThievingAllowed: this.settingsForm.get('pt').value,
        //     startingRoom: this.settingsForm.get('startingRoom').value,
        //     defaultRecallRoom: this.settingsForm.get('recallRoom').value,
        //     maxIdleTime: 300000,
        //     maxNpcCorpseTime: 5,
        //     maxPcCorpseTime: 10,
        //     minLevelCanShout: 3,
        //     playerTick: 500,
        //     updateTick: 1000

        // };

        // this.service.updateSettings(settings).pipe(take(1)).subscribe(response => {
        //     this.toast.success(`Settings Updated Successfully.`);
        // },
        //     err => console.log(err));

    }


}
