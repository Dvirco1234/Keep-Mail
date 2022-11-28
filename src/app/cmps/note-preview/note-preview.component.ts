import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'note-preview',
    templateUrl: './note-preview.component.html',
    styleUrls: ['./note-preview.component.scss'],
})
export class NotePreviewComponent implements OnInit {
    constructor() {}

    @Input() note!: any;

    ngOnInit(): void {}
}
