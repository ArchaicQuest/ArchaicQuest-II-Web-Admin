import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { User } from '../interface/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit/edit-user-modal.component';
import { Log } from '../interface/log.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Shared } from 'src/app/shared/shared';

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

    @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;

    constructor(private formBuilder: FormBuilder, private toast: ToastrService, private service: AccountService, private dialog: MatDialog, private helpers: Shared) {
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



        this.paginator.forEach(paginator => {
            console.log(paginator)
        })
        setTimeout(() => {
            this.dataSource.paginator = this.paginator[0];
        });


        setTimeout(() => {
            this.logData.paginator = this.paginator[1];
        });


    }

    ngOnInit() {
        this.addAccountForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            role: ['', Validators.required],

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

        this.service.addUser(this.addAccountForm.get('username').value, this.addAccountForm.get('password').value, this.addAccountForm.get('role').value).pipe(take(1)).subscribe(response => {
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

    isAdmin() {
        return this.helpers.isAdmin();
    }



}
