import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KeepAppComponent } from './pages/keep-app/keep-app.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';
import { NoteResolver } from './services/note.resolver';
import { LabelsModalComponent } from './cmps/labels-modal/labels-modal.component'
import { ArchiveNotesComponent } from './pages/archive-notes/archive-notes.component'
import { TrashNotesComponent } from './pages/trash-notes/trash-notes.component'
import { LoginSignupComponent } from './pages/login-signup/login-signup.component'

const routes: Routes = [
    // { path: 'keep/:id', component: NoteDetailsComponent },
    {
        path: 'login',
        component: LoginSignupComponent,
    },
    {
        path: 'keep/archive',
        component: KeepAppComponent,
    },
    {
        path: 'keep/trash',
        component: KeepAppComponent,
    },
    {
        path: 'keep',
        component: KeepAppComponent,
        children: [
            {
                path: 'labels-modal',
                component: LabelsModalComponent,
            },
            // {
            //     path: 'archive',
            //     component: KeepAppComponent,
            // },
            // {
            //     path: 'trash',
            //     component: KeepAppComponent,
            // },
            {
                path: ':id',
                component: NoteEditComponent,
                resolve: { note: NoteResolver },
            },
        ],
    },
    {
        path: 'keep/label/:labelId',
        component: KeepAppComponent,
    },
    {
        path: '',
        // component: HomeComponent,
        redirectTo: 'keep',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
