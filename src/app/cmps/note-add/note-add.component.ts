import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { Label, Note, Todo } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';
import { UtilService } from 'src/app/services/util-service.service';
import { TodosNoteComponent } from '../todos-note/todos-note.component';
import { UploadService } from 'src/app/services/upload-service.service';

@Component({
    selector: 'note-add',
    templateUrl: './note-add.component.html',
    styleUrls: ['./note-add.component.scss'],
    providers: [ClickOutsideDirective],
})
export class NoteAddComponent implements OnInit, AfterViewInit {
    constructor(
        private keepService: KeepService,
        private utilService: UtilService,
        private uploadService: UploadService
    ) {}

    @Input() isEdit!: boolean;
    @Input() noteToEdit!: Note | undefined;
    @Output() onSaveTodo = new EventEmitter<Note>();
    @Output() onCloseEditor = new EventEmitter();
    // @Input() public isOpen = false;
    @ViewChild('inputElement') inputElement!: ElementRef;
    @ViewChild('preElement') preElement!: ElementRef;
    @ViewChild('fileInput') fileInput!: ElementRef;
    @ViewChild(TodosNoteComponent, { static: false })
    todosNoteCmp!: TodosNoteComponent;

    note: Note = this.keepService.getEmptyNote();
    isDarkImg: boolean = false;
    isLabelsModalOpen: boolean = false;
    isOpen = false;
    isTodosNote = false;
    isPaletteOpen = false;
    closeActIcons = [
        { type: 'checkbox-checked', act: this.setTodosNote.bind(this) },
        { type: 'draw', act: this.try },
        { type: 'image', act: this.openImgUploader.bind(this) },
    ];

    openActIcons = [
        { type: 'edit', act: this.try },
        { type: 'label', act: this.openLabels.bind(this) },
        { type: 'palette', act: this.openPalette.bind(this) },
        { type: 'image', act: this.openImgUploader.bind(this) },
        { type: 'archive', act: this.try },
        { type: 'more-menu', act: this.try },
        { type: 'undo', act: this.try },
        { type: 'redo', act: this.try },
    ];

    get bgc() {
        let background = this.note.style.backgroundImg
            ? `url(${this.note.style.backgroundImg})`
            : this.note.style.backgroundColor;
        if (!background) background = '#fff';
        return { background };
    }

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
            // setTimeout(() => {
            //     this.todosNoteCmp.todoInput
            //         .toArray()
            //         [idx + 1].nativeElement.focus();
            // }, 0);
        }
    }

    focusTodo(idx: number = 0) {
        setTimeout(() => {
            this.inputElement.nativeElement.focus();
        }, 0);
    }

    editTodo(val: string) {
        this.newTodo();
        const { todos } = this.note.info;
        const lastIdx = todos?.length ? todos.length - 1 : 0;
        if (todos) todos[lastIdx].txt = val;
        this.inputElement.nativeElement.value = '';
        setTimeout(() => {
            this.todosNoteCmp.todoInput
                .toArray()
                [lastIdx].nativeElement.focus();
        }, 0);
    }

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

    togglePin(ev: Event) {
        ev.stopPropagation();
        this.note.isPinned = !this.note.isPinned;
    }

    setBackground(key: string, val: any) {
        this.note.style = val
    }

    openPalette() {
        if (this.isPaletteOpen) return;
        setTimeout(() => {
            this.isPaletteOpen = true;  
        })
    }
    
    closePalette() {
        if (!this.isPaletteOpen) return;
        this.isPaletteOpen = false
    }
    openLabels() {
        if (this.isLabelsModalOpen) return;
        setTimeout(() => {
            this.isLabelsModalOpen = true;  
        })
    }
    closeLabels() {
        if (!this.isLabelsModalOpen) return;
        this.isLabelsModalOpen = false
    }

    removeLabel(id: string, ev: Event) {
        ev.stopPropagation();
        // let labels = JSON.parse(JSON.stringify(this.note.labels || []));
        this.note.labels = this.note.labels.filter((l: Label) => l.id !== id);
    }

    async handleImage(ev: any) {
        const file = ev.target.files[0];
        try {
            const res = await this.uploadService.uploadImg(file);
            console.log('res: ', res);
            this.note.media = {
                type: 'img',
                url: res.url,
            };

            this.isDarkImg = await this.utilService.isDarkImg(res.url);
        } catch (error) {
            // console.error(error);
        }
    }

    public closeEditor(ev: MouseEvent): void {
        if (this.noteToEdit) {
            if(ev) this.onCloseEditor.emit();
            return this.onSaveTodo.emit(this.noteToEdit);
        }
        if (!this.isOpen) return;
        if (ev) ev.stopPropagation();
        const type = this.note.info.todos ? 'todos' : 'txt';
        const { title, txt, todos } = this.note.info;
        this.isOpen = false;
        this.isTodosNote = false;
        if (!title && !txt && !todos?.length && !this.note.media && !this.note.labels?.length) return;
        this.keepService.saveNote(
            JSON.parse(JSON.stringify({ ...this.note, type }))
        );
        // this.note.info = {
        //     title: '',
        //     txt: '',
        // };
        // this.note.media = null
        this.preElement.nativeElement.innerText = '';
        this.note = this.keepService.getEmptyNote();
        // this.cdr.markForCheck();
    }

    // setNoteTxt(txt: string | null) {
    //     if (ev.target instanceof HTMLElement) {
    //         console.log('ev: ', ev.target.innerText);
    //         this.note.info.txt = ev.target.innerText;
    //     }
    // }
    setNoteTxt(ev: Event) {
        if (ev.target instanceof HTMLElement) {
            console.log('ev: ', ev.target.innerText);
            this.note.info.txt = ev.target.innerText;
        }
    }

    openImgUploader() {
        this.fileInput.nativeElement.click();
    }

    ngOnInit(): void {
        console.log('this.note:', this.note);
        console.log('this.noteToEdit: ', this.noteToEdit);
        if (this.noteToEdit) {
            this.note = this.noteToEdit;
            this.isOpen = true;
            if (this.noteToEdit.info.todos) this.isTodosNote = true;
        }
    }

    ngAfterViewInit(): void {
        this.preElement.nativeElement.innerText = this.note.info.txt || '';
    }
}
