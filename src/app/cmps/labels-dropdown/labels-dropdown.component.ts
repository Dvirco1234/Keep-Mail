import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
    @Output() onClose = new EventEmitter();
    user!: User;
    labels!: Label[];
    searchTerm: string = '';

    loadUser() {
        this.user = this.userService.getLoggedInUser();
        this.labels = this.user['labels'].map((l: Label) => ({
            ...l,
            isChecked: this.note.labels?.some((label) => label.name === l.name) || false,
        }));
    }

    get labelsToShow(): Label[] {
        const regex = new RegExp(this.searchTerm, 'i')
        return this.labels.filter((label) => regex.test(label.name));
    }

    close() {
        this.onClose.emit();
    }

  toggleLabel(label: Label, ev: Event) {
      ev.stopPropagation();
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
        this.loadUser();
        console.log('this.note:', this.note)
    }
}
