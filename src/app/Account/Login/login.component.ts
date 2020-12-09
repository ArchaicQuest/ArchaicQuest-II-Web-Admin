import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interface/user.interface';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private toast: ToastrService,
        private authService: AuthenticationService
    ) { }




    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]

        })
    }

    login() {
        const user: User = {
            id: -1,
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value
        }
        this.authService.login(user.username, user.password).pipe(take(1)).subscribe((x) => {
            console.log("sucess", x)
            location.href = "/";
        }, () => {
            this.toast.error("Username or password is incorrect.");
        });
    }

}
