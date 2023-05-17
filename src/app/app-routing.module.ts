import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KeepAppComponent } from './pages/keep-app/keep-app.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';
import { NoteResolver } from './services/note.resolver';
import { LabelsModalComponent } from './cmps/labels-modal/labels-modal.component'

const routes: Routes = [
    // { path: 'keep/:id', component: NoteDetailsComponent },
    {
        path: 'keep',
        component: KeepAppComponent,
        children: [
            {
                path: 'labels-modal',
                component: LabelsModalComponent,
            },
            {
                path: ':id',
                component: NoteEditComponent,
                resolve: { note: NoteResolver },
            },
        ],
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
