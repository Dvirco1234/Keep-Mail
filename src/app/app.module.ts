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
import { NgxMasonryModule } from 'ngx-masonry';
import { SvgIconComponent } from './cmps/utils/svg-icon/svg-icon.component';
import { TodosNoteComponent } from './cmps/todos-note/todos-note.component';
import { NoteTemplatesComponent } from './cmps/note-templates/note-templates.component';
import { FormsModule } from '@angular/forms';
import { MasonryDirective } from './directives/masonary.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { UppercaseFirstPipe } from './pipes/uppercase-first.pipe';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';

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
        MasonryDirective,
        ClickOutsideDirective,
        UppercaseFirstPipe,
        NoteEditComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxMasonryModule,
        BrowserAnimationsModule,
        FormsModule,
        // MasonryModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
