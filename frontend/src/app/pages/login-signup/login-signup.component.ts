import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
    selector: 'login-signup',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {}

    isNewUser: boolean = false;
    fullname: string = '';
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    isLoading: boolean = false;

    onSubmit(ev: Event) {
        ev.preventDefault();
        this.isNewUser ? this.signup() : this.login();
    }
    async signup() {
        this.isLoading = true;
        const credentials = {
            fullname: this.fullname,
            username: this.username,
            password: this.password,
        };
        try {
            await this.userService.signup(credentials);
            this.router.navigateByUrl(`/keep`);
        } catch (err) {
            console.error(err);
        }
        this.isLoading = false;
    }

    async login() {
        this.isLoading = true;
        const credentials = {
            username: this.username,
            password: this.password,
        };
        try {
            await this.userService.login(credentials);
            this.router.navigateByUrl(`/keep`);
        } catch (err) {
            console.error(err);
        }
        this.isLoading = false;
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
