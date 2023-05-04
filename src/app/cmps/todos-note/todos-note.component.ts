import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    ViewChild,
    ElementRef,
    QueryList,
    ViewChildren,
    AfterViewInit,
    OnChanges,
} from '@angular/core';
import { Note, NoteTodo, Todo } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';

@Component({
    selector: 'todos-note',
    templateUrl: './todos-note.component.html',
    styleUrls: ['./todos-note.component.scss'],
})
export class TodosNoteComponent implements OnInit, AfterViewInit {
    @ViewChildren('todoInput', { read: ElementRef })
    todoInput!: QueryList<ElementRef>;

    constructor(private keepService: KeepService) {
        this.todoInput = new QueryList<ElementRef>();
    }
    // @ViewChild('todoInput') todoInput!: ElementRef;

    info!: NoteTodo;
    @Input() note!: Note;
    @Input() isEditable: boolean = false;
    @Output() onSaveTodo = new EventEmitter<[number, Todo | null]>();

    currTodo!: Todo;
    currInputIdx = 0;

    setCurrInput(idx: number) {
        // console.log('idx: ', idx);
        this.currInputIdx = idx;
    }

    toggleTodo(ev: Event, id: string) {
        ev.stopPropagation();
        const todos = this.info.todos;
        if (!todos) return;
        const idx = todos.findIndex((todo: any) => todo.id === id);
        todos[idx].doneAt = todos[idx].doneAt ? null : Date.now();
        this.keepService.updateNote(this.note);
    }

    saveTodo(idx: number) {
        // console.log('idx: ', idx);
        // const { todos } = this.note.info;
        // const todo = todos?.length ? todos[idx] : null;
        const todo = null;
        this.onSaveTodo.emit([idx, todo]);
        // setTimeout(() => {
        //     this.todoInput.nativeElement.focus();
        // }, 0);
    }

    onBackspace(ev: KeyboardEvent, idx: number) {
        console.log('ev: ', ev);
        const todos = this.info.todos;
        if (ev.key === 'Backspace' && !todos[idx].txt) this.removeTodo(idx)
        
    }

    removeTodo(idx: number) {
        const todos = this.info.todos;
        if (!todos) return;
        todos.splice(idx, 1);
        this.keepService.updateNote(this.note);
        const prevIdx = idx - 1 >= 0 ? idx - 1 : 0
        setTimeout(() => {
            this.todoInput.toArray()[prevIdx].nativeElement.focus()
        }, 0);
    }

    saveTodo1(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            // do something when the enter key is pressed
        }
    }

    get sortedTodos() {
        const { todos } = this.info;
        if (!todos) return;
        const activeTodos = todos.filter((todo) => !todo.doneAt);
        const doneTodos = todos.filter((todo) => todo.doneAt);
        return doneTodos.length && activeTodos.length
            ? [
                  ...activeTodos,
                  { doneAt: null, txt: 'seperator-div', id: '' },
                  ...doneTodos,
              ]
            : todos;
    }

    focusCurrTodo() {
        // console.log('hiiiiiii');
        // setTimeout(() => {
        //     this.todoInput.toArray()[this.currInputIdx].nativeElement.focus();
        // }, 0);
    }

    ngOnInit(): void {
        this.info = this.note.info as NoteTodo;
        this.currTodo = this.info.todos[0];
    }

    // ngOnChanges() {
    //     const { todos } = this.note.info;
    //     console.log('todos: ', todos);
    //     if (todos?.length && this.isEditable) {
    //         console.log('hiiiii');

    //         this.todoInput.toArray()[this.currInputIdx].nativeElement.focus();
    //     }
    // }

    ngAfterViewInit() {
        console.log('this.todoInput.toArray(): ', this.todoInput.toArray());
    }
}
