import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';

@Component({
    selector: 'note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
    constructor() {}
    public masonryOptions: NgxMasonryOptions = {
        // gutter: 16,
        gutter: 8,
        fitWidth: true,
        columnWidth: 240,
    };
    // notes: number[] = [1, 2, 3, 4, 5];
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

    ngOnInit(): void {}
}
