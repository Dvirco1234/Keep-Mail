import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KeepAppComponent } from './pages/keep-app/keep-app.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

const routes: Routes = [
    { path: 'keep/:id', component: NoteDetailsComponent },
    { path: 'keep', component: KeepAppComponent },
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
