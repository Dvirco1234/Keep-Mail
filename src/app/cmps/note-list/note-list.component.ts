import { Component, Input, OnInit } from '@angular/core';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { Note } from 'src/app/models';

@Component({
    selector: 'note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
    constructor() {}
    public masonryOptions: NgxMasonryOptions = {
        // gutter: 16,
        gutter: 10,
        fitWidth: true,
        columnWidth: 240,
    };
    @Input() notes!: Note[] | null;

    get notess(): Note[] {
        return this.notes
            ? this.notes.filter((note) => note.type === 'note-txt')
            : [];
    }
    masonryItems = [
        { title: 'item 1' },
        { title: 'item 2' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3erthhhh hhhhhhhh hhhhhh hhfgggg gggggg' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        {
            title: 'item 3erhttttttttttttttttttttttttttttttthjhjhjhjhjhjhjhjhjh',
        },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3erthhhhhhhhhhhhhhhhhhhhhhhhhhhhfgfgfgf' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
        { title: 'item 3' },
    ];

    ngOnInit(): void {
        // console.log('this.notes:', this.notes);
    }
}
