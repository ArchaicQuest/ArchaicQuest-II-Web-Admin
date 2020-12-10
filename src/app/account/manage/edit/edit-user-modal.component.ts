import { Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../account.service';
import { Shared } from 'src/app/shared/shared';

@Component({
    templateUrl: './edit-user-modal.component.html',
    styleUrls: ['./../../account.scss']
})
export class EditUserComponent implements OnInit {

    public addAccountForm: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private service: AccountService, private toast: ToastrService, private helpers: Shared) { }

    ngOnInit() {
        this.addAccountForm = this.formBuilder.group({
            username: [this.data.username],
            password: [''],
            role: [this.data.role],

        });

        if (!this.isAdmin()) {
            this.addAccountForm.get('username').disable();
        }

    }

    isAdmin() {

        return this.helpers.isAdmin();
    }

    editUser() {

        this.service.editUser(this.data.id, this.addAccountForm.get('username').value, this.addAccountForm.get('password').value, this.addAccountForm.get('role').value).pipe(take(1)).subscribe(response => {
            this.toast.success(`User Updated Successfully.`);
        },
            err => this.toast.error(err));

    }


}
