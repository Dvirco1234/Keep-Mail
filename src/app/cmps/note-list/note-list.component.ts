import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
    ViewChild,
    Output,
    EventEmitter,
    ElementRef,
} from '@angular/core';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { ResponsiveColumnsDirective } from 'src/app/directives/responsive-columns.directive'
import { Note } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service'

@Component({
    selector: 'note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss'],
    providers: [ResponsiveColumnsDirective],
})
export class NoteListComponent implements OnInit {
    @ViewChild(NgxMasonryComponent, { static: false }) masonry:
        | NgxMasonryComponent
        | any;
    
    // @ViewChild('parentElement') parentElementRef!: ElementRef;

    constructor(private keepService: KeepService) {}
    @Output() onUpdateNote = new EventEmitter<{ note: Note, key: string, value: any }>();
    
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
    @Input() currNote!: Note | null;

    // ngOnChanges(changes: SimpleChanges): void {
    //     // Check if the "myProperty" input has changed
    //     if (changes['notes']) {
    //         // this.masonry.reloadItems();
    //         // this.masonry.updateLayout();
    //         // this.masonry.layout();
    //         // Do something with the new value of "myProperty"
    //         // console.log(changes['notes'].currentValue);
    //     }
    // }
    
    get isSearch(): boolean {
        return this.keepService.searchTerm? true : false;
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
