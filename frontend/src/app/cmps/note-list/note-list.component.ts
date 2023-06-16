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
    ChangeDetectionStrategy,
} from '@angular/core';
import { ResponsiveColumnsDirective } from 'src/app/directives/responsive-columns.directive'
import { Note } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service'

@Component({
    selector: 'note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss'],
    providers: [ResponsiveColumnsDirective],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent implements OnInit {

    constructor(private keepService: KeepService) {}
    @Output() onUpdateNote = new EventEmitter<{ note: Note, key: string, value: any }>();

    @Input() notes!: Note[] | null;
    @Input() currNote!: Note | null;
    @Input() currRoute!: string;
    
    get filter() {
        return this.keepService.filterBy;
    }

    get pinnedNotes(): Note[] {
        return this.notes ? this.notes.filter((note) => note.isPinned) : [];
    }

    get unpinnedNotes(): Note[] {
        return this.notes ? this.notes.filter((note) => !note.isPinned) : [];
    }

    get noNotes() {
        let noNotes = { txt: '', icon: '' }
        if (this.filter.searchTerm) noNotes.txt = 'No notes found'
        else if (this.filter.isTrash) noNotes = { txt: 'No notes in Trash', icon: 'trash' }
        else if (this.filter.archiveOnly) noNotes = { txt: 'Your archived notes appear here', icon: 'archive' }
        else if (this.filter.labelId) noNotes = { txt: 'No notes with this label yet', icon: 'label' }
        else noNotes = { txt: 'No notes yet', icon: 'bulb' }
        return noNotes
    }

    ngOnInit(): void {
        // setTimeout(() => {
        //     console.log('this.notes:', this.notes);
        // this.notes?.map(n => {
        //     console.log('n: ', n);
        //     if (!n.createdAt || (n.createdAt + '').length > 13) n.createdAt = 1686847197707 - Math.floor(Math.random() * 1000000)
        //     this.keepService.updateNote(n)
        // })
        // }, 5000);
        
    }

    trackByFn(idx: number, note: Note) {

    }
}
