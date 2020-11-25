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

        this.service.addUser(this.addAccountForm.get('username').value, this.addAccountForm.get('password').value).pipe(take(1)).subscribe(response => {
            this.toast.success(`User Updated Successfully.`);
        },
            err => this.toast.error(err));

    }

    deleteUser(id: number) {

        this.service.deleteUser(id).pipe(take(1)).subscribe(response => {
            this.toast.success(`User deleted successfully.`);
        },
            err => this.toast.error(err));

    }



}
