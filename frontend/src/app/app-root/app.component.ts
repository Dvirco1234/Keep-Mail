import { Component } from '@angular/core';
import { KeepService } from '../services/keep-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Keep-Mail';

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
