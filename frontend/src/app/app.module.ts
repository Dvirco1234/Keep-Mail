import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MasonryModule } from 'masonry-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { NoteListComponent } from './cmps/note-list/note-list.component';
import { KeepAppComponent } from './pages/keep-app/keep-app.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { NotePreviewComponent } from './cmps/note-preview/note-preview.component';
import { HomeComponent } from './pages/home/home.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { SideNavFilterComponent } from './cmps/side-nav-filter/side-nav-filter.component';
import { NoteAddComponent } from './cmps/note-add/note-add.component';
import { SvgIconComponent } from './cmps/utils/svg-icon/svg-icon.component';
import { TodosNoteComponent } from './cmps/todos-note/todos-note.component';
import { NoteTemplatesComponent } from './cmps/note-templates/note-templates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UppercaseFirstPipe } from './pipes/uppercase-first.pipe';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';
import { MoveToCenterDirective } from './directives/move-to-center.directive';
import { MoveModalToCenterDirective } from './directives/move-modal-to-center.directive';
import { ResponsiveColumnsDirective } from './directives/responsive-columns.directive';
import { HttpClientModule } from '@angular/common/http';
import { LabelsModalComponent } from './cmps/labels-modal/labels-modal.component';
import { PalleteModalComponent } from './cmps/pallete-modal/pallete-modal.component';
import { LabelsDropdownComponent } from './cmps/labels-dropdown/labels-dropdown.component';
import { ArchiveNotesComponent } from './pages/archive-notes/archive-notes.component';
import { TrashNotesComponent } from './pages/trash-notes/trash-notes.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component'
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig  } from '@abacritt/angularx-social-login'


@NgModule({
    declarations: [
        AppComponent,
        NoteListComponent,
        KeepAppComponent,
        NoteDetailsComponent,
        NotePreviewComponent,
        HomeComponent,
        AppHeaderComponent,
        SideNavFilterComponent,
        NoteAddComponent,
        SvgIconComponent,
        TodosNoteComponent,
        NoteTemplatesComponent,
        ClickOutsideDirective,
        UppercaseFirstPipe,
        NoteEditComponent,
        MoveToCenterDirective,
        MoveModalToCenterDirective,
        ResponsiveColumnsDirective,
        LabelsModalComponent,
        PalleteModalComponent,
        LabelsDropdownComponent,
        ArchiveNotesComponent,
        TrashNotesComponent,
        LoginSignupComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        // MasonryModule
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider('260718967201-v3448p2okre1tii1j7k6rdq4ri1mlqqf.apps.googleusercontent.com'),
                },
              ],
            } as SocialAuthServiceConfig,
          },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    // constructor(private socialAuthService: SocialAuthService) {
    //     this.socialAuthService.initState.subscribe(() => {
    //       // Initialize Google Login Provider
    //       this.socialAuthService.addConfig({
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(googleClientId)
    //       });
    //     });
    //   }
}
