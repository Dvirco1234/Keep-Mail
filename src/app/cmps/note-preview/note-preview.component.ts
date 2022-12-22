import { Component, Input, OnInit } from '@angular/core';
// import { AudioNoteComponent } from '../notes/audio-note/audio-note.component';
// import { ImgNoteComponent } from '../notes/img-note/img-note.component';
// import { TodosNoteComponent } from '../notes/todos-note/todos-note.component';
// import { TxtNoteComponent } from '../notes/txt-note/txt-note.component';
// import { VideoNoteComponent } from '../notes/video-note/video-note.component';

@Component({
    selector: 'note-preview',
    templateUrl: './note-preview.component.html',
    styleUrls: ['./note-preview.component.scss'],
})
export class NotePreviewComponent implements OnInit {
    // cmpType = TxtNoteComponent;

    constructor() {}

    @Input() note!: any;

    get isImgOnly() {
        const { info } = this.note;
        return { 'img-only': !info.txt && !info.title && this.note.media };
    }

    get isEmptyNote() {
        const { info } = this.note;
        if (info.title || this.note.media || info.txt || info.todos?.length) {
            return false;
        }
        return true;
    }

    get bgc() {
        return { backgroundColor: this.note.style.backgroundColor };
    }

    // actIcons = ['edit','label', 'palette', 'image', 'archive', 'more-menu'];
    actIcons = [
        { type: 'edit', act: this.editNote },
        { type: 'label', act: this.toggleAddLabels },
        { type: 'palette', act: this.togglePalette },
        { type: 'image', act: this.uploadImg },
        { type: 'archive', act: this.archiveNote },
        { type: 'more-menu', act: this.toggleMenu },
    ];

    editNote() {
        console.log('editNote: ');
    }
    toggleAddLabels() {
        console.log('toggleAddLabels: ');
    }
    togglePalette() {
        console.log('togglePalette: ');
    }
    uploadImg() {
        console.log('uploadImg: ');
    }
    archiveNote() {
        console.log('archiveNote: ');
    }
    toggleMenu() {
        console.log('toggleMenu: ');
    }

    toggleCheck() {}

    togglePin() {}
    // get isEmptyNote() {
    //     const { info } = this.note;
    //     if (!info.title && !this.note.media) {
    //         if (this.note.type === 'txt' && !info.txt) return true;
    //         else if (!info.todos) return true;
    //     }
    //     return false;
    // }

    ngOnInit(): void {
        // console.log('this.note:', this.note);
    }
}

// setCmpType() {
//     const { type } = this.note;
//     if (type === 'txt') this.cmpType = TxtNoteComponent;
//     if (type === 'todos') this.cmpType = TodosNoteComponent;
//     if (type === 'audio') this.cmpType = AudioNoteComponent;
//     if (type === 'video') this.cmpType = VideoNoteComponent;
//     if (type === 'img') this.cmpType = ImgNoteComponent;
// }

// ngOnInit(): void {
//     this.setCmpType();
//     console.log('this.note:', this.note);
// }
