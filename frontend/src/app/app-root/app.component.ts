// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { KeepService } from '../services/keep-service.service';
// import {
//   SocialAuthService,
//   GoogleLoginProvider,
//   SocialUser,
// } from 'angularx-social-login';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
// })
// export class AppComponent implements OnInit {
//     title = 'Keeper';
//   loginForm!: FormGroup;
//   socialUser!: SocialUser;
//   isLoggedin?: boolean;
//     constructor (
//         private keepService: KeepService,
//     private formBuilder: FormBuilder,
//     private socialAuthService: SocialAuthService
//   ) {}
//     ngOnInit() {
//         this.keepService.loadNotes();
//     this.loginForm = this.formBuilder.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//     this.socialAuthService.authState.subscribe((user) => {
//       this.socialUser = user;
//       this.isLoggedin = user != null;
//       console.log(this.socialUser);
//     });
//   }
//   loginWithGoogle(): void {
//     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
//   }
//   logOut(): void {
//     this.socialAuthService.signOut();
//   }
// }


import { Component } from '@angular/core';
import { KeepService } from '../services/keep-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Keeper';
    
    constructor(private keepService: KeepService) {}
    
    ngOnInit(): void {
        this.keepService.loadNotes();
    }
}
//TODO - connect observable
//TODO - learn classes
//TODO - in mail use quill edit - https://www.npmjs.com/package/vue3-quill
//TODO - connect push notification
//TODO - pwa
//TODO - login with google / facebook
//TODO - optimistic
