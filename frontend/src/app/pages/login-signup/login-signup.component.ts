import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service'

@Component({
    selector: 'login-signup',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
    constructor(private userService: UserService) {}

    isNewUser: boolean = false;
    fullname: string = '';
    username: string = '';
    password: string = '';
    confirmPassword: string = '';

    onSubmit(ev: Event) {
        ev.preventDefault();
        this.isNewUser ? this.signup() : this.login();
    }
    signup() {
        const credentials = {
            fullname: this.fullname,
            username: this.username,
            password: this.password,
        }
        this.userService.signup(credentials)
    }

    login() {
        const credentials = {
            username: this.username,
            password: this.password,
        }
        this.userService.login(credentials)
    }

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
