import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';
import {
    SocialAuthService,
    GoogleLoginProvider,
    SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
    selector: 'login-signup',
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
    // providers: [SocialAuthService],
})
export class LoginSignupComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router,
        private socialAuthService: SocialAuthService
    ) {}

    user!: SocialUser;
    isNewUser: boolean = false;
    fullname: string = '';
    username: string = '';
    password: string = '';
    imgUrl: string = '';
    confirmPassword: string = '';
    isLoading: boolean = false;

    onSubmit(ev: Event) {
        ev.preventDefault();
        this.isNewUser ? this.signup() : this.login();
    }
    async signup() {
        this.isLoading = true;
        const { fullname, username, password, imgUrl } = this;
        const credentials = {
            fullname,
            username,
            password,
            imgUrl,
        };
        // const credentials = {
        //     fullname: this.fullname,
        //     username: this.username,
        //     password: this.password,
        // };
        try {
            await this.userService.signup(credentials);
            this.isLoading = false;
            this.router.navigateByUrl(`/keep`);
        } catch (err) {
            console.error(err);
            this.login();
        }
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

    loginWithGoogle(): void {
        // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
        this.socialAuthService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((user: SocialUser) => {
                // Handle the logged-in user data
                console.log(user);
            })
            .catch((err: any) => {
                // Handle error
                console.error(err);
            });
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

    ngOnInit(): void {
        this.socialAuthService.authState.subscribe((user: SocialUser) => {
            if (!user) return;
            const { email, name, photoUrl, id } = user;
            this.fullname = name;
            this.username = email;
            this.password = id;
            this.imgUrl = photoUrl;
            this.signup();
        });
    }
}
