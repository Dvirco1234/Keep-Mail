import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-signup',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
    constructor() {}

    isNewUser: boolean = false;
    fullname: string = '';
    username: string = '';
    password: string = '';

    onSubmit(ev: Event) {
        ev.preventDefault();
        this.isNewUser ? this.signup() : this.login();
    }
    signup() {}

    login() {}

    toggleStatus() {
        this.isNewUser = !this.isNewUser;
        this.reset();
    }

    reset() {
        this.fullname = '';
        this.username = '';
        this.password = '';
    }

    ngOnInit(): void {}
}
