import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { Note } from 'src/app/models';

@Component({
    selector: 'note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit, OnChanges {
    @ViewChild(NgxMasonryComponent, { static: false }) masonry:
        | NgxMasonryComponent
        | any;

    constructor() {}

    updateLayout(): void {
        //     // Update the Masonry layout
        //     this.masonry.updateLayout();
        //     this.masonry.reloadItems();
        //     this.masonry.layout();
    }

    public masonryOptions: NgxMasonryOptions = {
        gutter: 10,
        fitWidth: true,
        columnWidth: 240,
        // initLayout: true,
        originLeft: true,
        horizontalOrder: true,
    };

    @Input() notes!: Note[] | null;

    ngOnChanges(changes: SimpleChanges): void {
        // Check if the "myProperty" input has changed
        if (changes['notes']) {
            // this.masonry.reloadItems();
            // this.masonry.updateLayout();
            // this.masonry.layout();
            // Do something with the new value of "myProperty"
            console.log(changes['notes'].currentValue);
        }
    }

    get notess(): Note[] {
        return this.notes
            ? this.notes.filter((note) => note.type === 'note-txt')
            : [];
    }

    get pinnedNotes(): Note[] {
        return this.notes ? this.notes.filter((note) => note.isPinned) : [];
    }

    get unpinnedNotes(): Note[] {
        return this.notes ? this.notes.filter((note) => !note.isPinned) : [];
    }

    ngOnInit(): void {
        console.log('this.notes:', this.notes);
    }

    trackByFn(idx: number, note: Note) {
        // console.log('idx: ', idx);
        // console.log('note: ', note);
        // return note._id
    }
}
