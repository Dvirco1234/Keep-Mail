import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { Note } from 'src/app/models';

type KeyValue = {
    [key: string]: any;
};

@Component({
    selector: 'pallete-modal',
    templateUrl: './pallete-modal.component.html',
    styleUrls: ['./pallete-modal.component.scss'],
    providers: [ClickOutsideDirective],
})
export class PalleteModalComponent implements OnInit {
    constructor() {}
    @Input() note!: Note;
    // @Input() isOpen!: boolean;
    @Output() onUpdateNote = new EventEmitter<[string, any]>();
    @Output() onClose = new EventEmitter();

    ngOnInit(): void {}

    colors = [
        { name: 'Default', color: '' },
        { name: 'Red', color: '#f28b82' },
        { name: 'Orange', color: '#fbbc04' },
        { name: 'Yellow', color: '#fff475' },
        { name: 'Green', color: '#ccff90' },
        { name: 'Teal', color: '#a7ffeb' },
        { name: 'Blue', color: '#cbf0f8' },
        { name: 'Dark blue', color: '#aecbfa' },
        { name: 'Purple', color: '#d7aefb' },
        { name: 'Pink', color: '#fdcfe8' },
        { name: 'Brown', color: '#e6c9a8' },
        { name: 'Gray', color: '#e8eaed' },
    ];
    images = [
        { name: 'Default', url: '' },
        {
            name: 'Groceries',
            url: 'https://www.gstatic.com/keep/backgrounds/grocery_light_0609.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg',
        },
        {
            name: 'Food',
            url: 'https://www.gstatic.com/keep/backgrounds/food_light_0609.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg',
        },
        {
            name: 'Music',
            url: 'https://www.gstatic.com/keep/backgrounds/music_light_0609.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg',
        },
        {
            name: 'Recipes',
            url: 'https://www.gstatic.com/keep/backgrounds/recipe_light_0609.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg',
        },
        {
            name: 'Notes',
            url: 'https://www.gstatic.com/keep/backgrounds/notes_light_0609.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg',
        },
        {
            name: 'Places',
            url: 'https://www.gstatic.com/keep/backgrounds/places_light_0609.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg',
        },
        {
            name: 'Travel',
            url: 'https://www.gstatic.com/keep/backgrounds/travel_light_0614.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg',
        },
        {
            name: 'Video',
            url: 'https://www.gstatic.com/keep/backgrounds/video_light_0609.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg',
        },
        {
            name: 'Celebration',
            url: 'https://www.gstatic.com/keep/backgrounds/celebration_light_0714.svg',
            smallUrl:
                'https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg',
        },
    ];

    closePalette() {
      this.onClose.emit();
    }

    pickBg(color: string, key: string) {
        const style: KeyValue = { ...this.note.style };
        style[key] = color;
        this.onUpdateNote.emit(['style', style]);
    }
}
