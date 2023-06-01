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
    
    get isSearch(): boolean {
        return this.keepService.filterBy.searchTerm? true : false;
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

    }
}
