import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';

@Component({
    selector: 'keep-app',
    templateUrl: './keep-app.component.html',
    styleUrls: ['./keep-app.component.scss'],
})
export class KeepAppComponent implements OnInit {
    constructor(private keepService: KeepService) {}
    // notes!: Note[];
    notes$!: Observable<Note[]>;
    currNote$!: Observable<Note | null>;
    currEditedNote: Note | null = null;

    ngOnInit(): void {
        this.keepService.loadNotes();
        this.notes$ = this.keepService.notes$;
        this.currNote$ = this.keepService.currNote$;
        // console.log('this.notes$: ', this.notes$);
    }

    updateNote({ note, key, value }: { note: Note, key: string, value: any }) {
        console.log('note, key, value: ', note, key, value);
        this.keepService.updateNoteByKey(note, key, value)
    }
}
