import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs'
import { Label, Note, User } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
    selector: 'labels-dropdown',
    templateUrl: './labels-dropdown.component.html',
    styleUrls: ['./labels-dropdown.component.scss'],
})
export class LabelsDropdownComponent implements OnInit {
    constructor(
        private keepService: KeepService,
        private userService: UserService
    ) {}

    @Input() note!: Note;
    @Output() onUpdateNote = new EventEmitter();
    @Output() onClose = new EventEmitter();
    user!: User;
    labels!: Label[];
    searchTerm: string = '';
    user$!: Observable<User>;
    subscription!: Subscription;

    loadUser() {
        // this.user = this.userService.getLoggedInUser();
        this.labels = this.user['labels'].map((l: Label) => ({
            ...l,
            isChecked:
                this.note.labels?.some((label) => label.name === l.name) ||
                false,
        }));
    }

    get labelsToShow(): Label[] {
        this.labels = this.user['labels'].map((l: Label) => ({
            ...l,
            isChecked:
                this.note.labels?.some((label) => label.name === l.name) ||
                false,
        }));
        const regex = new RegExp(this.searchTerm, 'i');
        return this.labels.filter((label) => regex.test(label.name));
    }

    close() {
        this.onClose.emit();
    }

    // setUpdatedNote() {
    //     this.onUpdateNote.emit();
    // }

    toggleLabel(label: Label, ev: Event) {
        ev.stopPropagation();
        // ev.preventDefault();
        let labels = JSON.parse(JSON.stringify(this.note.labels || []));
        if (label['isChecked'])
            labels = labels.filter((l: Label) => l.id !== label.id);
        else {
            delete labels.isChecked;
            labels.push(label);
        }
        this.updateNote(labels);
    }

    updateNote(value: any) {
        this.keepService.updateNoteByKey(this.note, 'labels', value);
        this.loadUser();
    }

    ngOnInit(): void {
        // this.loadUser();
        this.subscription = this.userService.user$.subscribe(user => {
            this.user = user
            this.loadUser();
          })
    }
}
