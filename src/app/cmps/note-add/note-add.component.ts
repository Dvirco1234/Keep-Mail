import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';

import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { Note, Todo } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';
import { UtilService } from 'src/app/services/util-service.service';
import { TodosNoteComponent } from '../todos-note/todos-note.component';

@Component({
    selector: 'note-add',
    templateUrl: './note-add.component.html',
    styleUrls: ['./note-add.component.scss'],
    providers: [ClickOutsideDirective],
})
export class NoteAddComponent implements OnInit {
    constructor(
        private keepService: KeepService,
        private utilService: UtilService
    ) {}
    // @Input() public isOpen = false;
    @ViewChild('inputElement') inputElement!: ElementRef;
    @ViewChild(TodosNoteComponent, { static: false })
    todosNoteCmp!: TodosNoteComponent;

    note: Note = this.keepService.getEmptyNote();
    isOpen = false;
    isTodosNote = false;
    closeActIcons = [
        { type: 'checkbox-checked', act: this.setTodosNote.bind(this) },
        { type: 'draw', act: this.try },
        { type: 'image', act: this.try },
    ];

    openActIcons = [
        { type: 'edit', act: this.try },
        { type: 'label', act: this.try },
        { type: 'palette', act: this.try },
        { type: 'image', act: this.try },
        { type: 'archive', act: this.try },
        { type: 'more-menu', act: this.try },
        { type: 'undo', act: this.try },
        { type: 'redo', act: this.try },
    ];
    try() {
        console.log('work:');
    }
    newTodo(idx: number = 0, newTodo: Todo | null = null) {
        if (!idx) idx = this.note.info.todos?.length || 0;
        // const lastIdx = this.note.info.todos?.length
        // ? this.note.info.todos.length - 1
        // : 0;
        // if (idx === lastIdx) this.inputElement.nativeElement.focus();
        const todo = {
            id: this.utilService.makeId(),
            txt: '',
            doneAt: null,
        };
        // this.note.info.todos?.push(todo);
        this.note.info.todos?.splice(idx, 0, todo);
        // this.focusTodo(idx);
    }

    focusNewTodo(idx: number = 0, newTodo: Todo | null = null) {
        const lastIdx = this.note.info.todos?.length
            ? this.note.info.todos.length - 1
            : 0;
        if (idx === lastIdx) this.inputElement.nativeElement.focus();
        else {
            this.newTodo(idx + 1);
            setTimeout(() => {
                this.todosNoteCmp.todoInput
                    .toArray()
                    [idx + 1].nativeElement.focus();
            }, 0);
        }
    }

    focusTodo(idx: number = 0) {
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        }, 0);
    }

    editTodo(val: string) {
        this.newTodo();
        console.log('val: ', val);
        const { todos } = this.note.info;
        console.log('todos: ', todos);
        const lastIdx = todos?.length ? todos.length - 1 : 0;
        if (todos) todos[lastIdx].txt = val;
        console.log('todos: ', todos);
        this.inputElement.nativeElement.value = '';
        setTimeout(() => {
            this.todosNoteCmp.todoInput
                .toArray()
                [lastIdx].nativeElement.focus();
        }, 0);
    }

    // saveTodo(
    //     idx: number,
    //     todo: {
    //         id: string;
    //         txt: string;
    //         isDone?: boolean;
    //         doneAt: number | null;
    //     }
    // ) {
    //     this.note.info.todos?.splice(idx, 1, todo);
    // }

    // get noteTodos() {
    //     return this.note.info.todos || [];
    // }

    setTodosNote() {
        // this.note.type = 'todos';
        this.isTodosNote = true;
        this.note.info = {
            title: '',
            todos: [],
            txt: '',
        };
        // this.newTodo();
        this.focusTodo();
        // setTimeout(() => {
        //     this.inputElement.nativeElement.focus();
        // }, 0);
    }

    // openEditor() {
    //     this.isOpen = true;
    // }
    // close(ev: Event) {
    //     ev.stopPropagation();
    //     this.isOpen = false;
    // }

    togglePin(ev: Event) {
        ev.stopPropagation();
        this.note.isPinned = !this.note.isPinned;
    }

    public closeEditor(ev: MouseEvent): void {
        ev.stopPropagation();
        console.log('this.note.info: ', this.note.info);
        this.isOpen = false;
        this.note.info = {
            title: '',
            txt: '',
        };
        this.isTodosNote = false;
        // this.cdr.markForCheck();
    }

    ngOnInit(): void {}
}
