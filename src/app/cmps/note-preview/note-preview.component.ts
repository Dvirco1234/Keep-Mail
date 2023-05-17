import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/models';
import { UtilService } from 'src/app/services/util-service.service';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { MoveToCenterDirective } from 'src/app/directives/move-to-center.directive'
import { MoveModalToCenterDirective } from 'src/app/directives/move-modal-to-center.directive'
// import { AudioNoteComponent } from '../notes/audio-note/audio-note.component';
// import { ImgNoteComponent } from '../notes/img-note/img-note.component';
// import { TodosNoteComponent } from '../notes/todos-note/todos-note.component';
// import { TxtNoteComponent } from '../notes/txt-note/txt-note.component';
// import { VideoNoteComponent } from '../notes/video-note/video-note.component';

@Component({
    selector: 'note-preview',
    templateUrl: './note-preview.component.html',
    styleUrls: ['./note-preview.component.scss'],
    providers: [ClickOutsideDirective, MoveToCenterDirective, MoveModalToCenterDirective,],
})
export class NotePreviewComponent implements OnInit {
    // cmpType = TxtNoteComponent;
    constructor (private utilService: UtilService, private router: Router) {}

    @Input() note!: any;
    @Input() isCurrNote!: boolean;
    @Output() onUpdateNote = new EventEmitter<{
        note: Note | any;
        key: string;
        value: any;
    }>();

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
        const background = this.note.style.backgroundImg
            ? `url(${this.note.style.backgroundImg})`
            : this.note.style.backgroundColor;
        return { background };
    }

    // get moveToCenter() {

    // }

    isDarkImg: boolean = false;
    isShown: boolean = false;
    isPaletteOpen: boolean = false;

    // actIcons = ['edit','label', 'palette', 'image', 'archive', 'more-menu'];
    actIcons = [
        { type: 'edit', act: this.editNote.bind(this) },
        { type: 'label', act: this.toggleAddLabels },
        { type: 'palette', act: this.openPalette.bind(this) },
        { type: 'image', act: this.uploadImg },
        { type: 'archive', act: this.archiveNote },
        { type: 'more-menu', act: this.toggleMenu },
    ];

    // colors = [
    //     { name: 'Default', color: '' },
    //     { name: 'Red', color: '#f28b82' },
    //     { name: 'Orange', color: '#fbbc04' },
    //     { name: 'Yellow', color: '#fff475' },
    //     { name: 'Green', color: '#ccff90' },
    //     { name: 'Teal', color: '#a7ffeb' },
    //     { name: 'Blue', color: '#cbf0f8' },
    //     { name: 'Dark blue', color: '#aecbfa' },
    //     { name: 'Purple', color: '#d7aefb' },
    //     { name: 'Pink', color: '#fdcfe8' },
    //     { name: 'Brown', color: '#e6c9a8' },
    //     { name: 'Gray', color: '#e8eaed' },
    // ];
    // images = [
    //     { name: 'Default', url: '' },
    //     {
    //         name: 'Groceries',
    //         url: 'https://www.gstatic.com/keep/backgrounds/grocery_light_0609.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Food',
    //         url: 'https://www.gstatic.com/keep/backgrounds/food_light_0609.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Music',
    //         url: 'https://www.gstatic.com/keep/backgrounds/music_light_0609.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Recipes',
    //         url: 'https://www.gstatic.com/keep/backgrounds/recipe_light_0609.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Notes',
    //         url: 'https://www.gstatic.com/keep/backgrounds/notes_light_0609.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Places',
    //         url: 'https://www.gstatic.com/keep/backgrounds/places_light_0609.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Travel',
    //         url: 'https://www.gstatic.com/keep/backgrounds/travel_light_0614.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Video',
    //         url: 'https://www.gstatic.com/keep/backgrounds/video_light_0609.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg',
    //     },
    //     {
    //         name: 'Celebration',
    //         url: 'https://www.gstatic.com/keep/backgrounds/celebration_light_0714.svg',
    //         smallUrl:
    //             'https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg',
    //     },
    // ];

    editNote() { 
        this.router.navigateByUrl(`/keep/${this.note._id}`);
    }
    openEditModal(el: EventTarget | null) {
        console.log('el: ', el);
    }
    toggleAddLabels() {
        console.log('toggleAddLabels: ');
    }
    openPalette() {
        if (this.isPaletteOpen) return;
        setTimeout(() => {
            this.isPaletteOpen = !this.isPaletteOpen;
            this.isShown = !this.isShown;    
        });
    }
    closePalette() {
        if (!this.isPaletteOpen) return;
        this.isPaletteOpen = false;
        this.isShown = false;
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
    pickBg(color: string, key: string) {
        console.log('color: ', color);
        // const style = color.length < 10 && color.length ? {...this.note.style, backgroundColor: color} : {...this.note.style, backgroundImg: color}
        const style = { ...this.note.style };
        style[key] = color;
        console.log('style: ', style);
        this.updateNote('style', style);
    }

    updateNote(key: string, value: any) {
        this.onUpdateNote.emit({ note: this.note, key, value });
    }

    toggleCheck() {}

    togglePin() {
        this.updateNote('isPinned', !this.note.isPinned);
        console.log('this.note.isPinned: ', this.note.isPinned);
    }
    // get isEmptyNote() {
    //     const { info } = this.note;
    //     if (!info.title && !this.note.media) {
    //         if (this.note.type === 'txt' && !info.txt) return true;
    //         else if (!info.todos) return true;
    //     }
    //     return false;
    // }

    async ngOnInit() {
        const { media } = this.note;
        if (media?.type === 'img')
            this.isDarkImg = await this.utilService.isDarkImg(media.url);
        console.log('this.note:', this.note, this.isDarkImg);
        // console.log('this.isEdit: ', this.isEdit);

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
