import { Component, Input, OnInit } from '@angular/core';
import { NoteTodo } from 'src/app/models';

@Component({
    selector: 'todos-note',
    templateUrl: './todos-note.component.html',
    styleUrls: ['./todos-note.component.scss'],
})
export class TodosNoteComponent implements OnInit {
    constructor() {}

    @Input() info!: NoteTodo;

    // toggleTodo(id: string) {
    //     const todos = JSON.parse(JSON.stringify(this.info.todos));
    //     const idx = todos.findIndex((todo: any) => todo.id === id);
    //     todos[idx].doneAt = todos[idx].doneAt ? null : Date.now();
    // }
    toggleTodo(id: string) {
        const idx = this.info.todos.findIndex((todo) => todo.id === id);
        this.info.todos[idx].doneAt = this.info.todos[idx].doneAt
            ? null
            : Date.now();
    }

    get sortedTodos() {
        const { todos } = this.info;
        const activeTodos = todos.filter((todo) => !todo.doneAt);
        const doneTodos = todos.filter((todo) => todo.doneAt);
        return doneTodos.length
            ? [
                  ...activeTodos,
                  { doneAt: null, txt: 'seperator-div', id: '' },
                  ...doneTodos,
              ]
            : activeTodos;
    }

    ngOnInit(): void {}
}
