import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { User } from '../interface/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit/edit-user-modal.component';
import { Log } from '../interface/log.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageAccountsComponent implements OnInit {

    public addAccountForm: FormGroup;
    public users: User[];
    public displayedColumns: string[] = ['username', 'role', 'lastActive', 'contributions', 'actions'];
    public dataSource: MatTableDataSource<User>;

    public logs: Log[];
    public logCols: string[] = ['username', 'details', 'created'];
    public logData: MatTableDataSource<Log>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private formBuilder: FormBuilder, private toast: ToastrService, private service: AccountService, private dialog: MatDialog) {
    }

    editUser(user: User) {
        this.dialog.open(EditUserComponent, {
            data: {
                username: user.username,
                id: user.id,
                role: user.role
            }
        });
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.logData.paginator = this.paginator;
        });

        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
        });


    }

    ngOnInit() {
        this.addAccountForm = this.formBuilder.group({
            username: [''],
            password: [''],
            role: [''],

        });

        this.service.getUsers().pipe(take(1)).subscribe((users) => {
            this.users = users;
            this.dataSource = new MatTableDataSource(users);
        })

        this.service.getLogs().pipe(take(1)).subscribe((log) => {
            this.logs = log;
            this.logData = new MatTableDataSource(log);
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
