import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Label, Note } from '../models';
import { AsyncStorageService } from './async-storage-service.service';
import { UtilService } from './util-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const notes = [] as Note[];
// const notes: Note[] = ;
const BASE_URL =
    process.env['NODE_ENV'] === 'production'
        ? '/api/'
        : '//localhost:3030/api/';

@Injectable({
    providedIn: 'root',
})
export class KeepService {
    private NOTES_KEY: string = 'notesDB';
    private LABELS_KEY: string = 'labelsDB';
    private _notesDb: Note[] = this._createNotes();
    private _labelsDb: Note[] = this._createLabels();

    public searchTerm: string = '';
    public currLabelId: string = '';
    public isArchivedFilter: boolean = false;
    public isTrashNotes: boolean = false;

    private _notes$ = new BehaviorSubject<Note[]>([]);
    public notes$ = this._notes$.asObservable();

    private _labels$ = new BehaviorSubject<Label[]>([]);
    public labels$ = this._labels$.asObservable();

    // private _filterBy$ = new BehaviorSubject<NoteFilter>({ term: '' });
    // public filterBy$ = this._filterBy$.asObservable();
    // public currEditedNote: Note | null = null
    private _currNote$ = new BehaviorSubject<Note | null>(null);
    public currNote$ = this._currNote$.asObservable();

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private utilService: UtilService,
        private storageService: AsyncStorageService,
        private http: HttpClient
    ) {}

    public loadNotes() {
        let notes = this._notesDb;
        if (this.currLabelId)
            notes = notes.filter(
                (note: Note) =>
                    note.labels?.some((l) => l.id === this.currLabelId) || false
            );
        notes = this._filter(notes, this.searchTerm);
        this._notes$.next(this._sort(notes as Note[]));
    }

    public getNoteById(id: string): Observable<Note> {
        const note = this._notesDb.find((note) => note._id === id);
        return note ? of(note) : throwError(() => `Note id ${id} not found!`);
    }

    public setCurrNote(note: Note | null): void {
        this._currNote$.next(note);
    }

    public getEmptyNote() {
        return {
            type: '',
            info: { title: '', txt: '' },
            media: null,
            _id: '',
            isPinned: false,
            labels: [],
            style: { backgroundColor: '', backgroundImg: '' },
        };
    }

    public deleteNote(id: string) {
        //mock the server work
        this._notesDb = this._notesDb.filter((note) => note._id !== id);

        // change the observable data in the service - let all the subscribers know
        this._notes$.next(this._notesDb);
    }

    public saveNote(note: Note) {
        return note._id ? this._updateNote(note) : this._addNote(note);
    }

    public setSearchFilter(term: string) {
        this.searchTerm = term;
        this.loadNotes();
    }
    public setCurrLabelId(labelId: string) {
        this.currLabelId = labelId;
        this.loadNotes();
    }
    public setArchiveTrashRoute(route: string) {
        // let notes = this._notesDb;
        // if (route === 'archive') this._notes$.next(notes.filter(note => note.isArchived));
        // else if (route === 'trash') this._notes$.next(notes.filter(note => note.deletedAt));
        this.isArchivedFilter = route === 'archive';
        this.loadNotes();
    }

    // public setFilterBy(filterBy: NoteFilter) {
    //     this._filterBy$.next(filterBy);
    //     this.loadNotes();
    // }
    // public updateNote(_id: string, key: string, val: any) {
    //     //mock the server work
    //     const note = this._getById(_id);
    //     if (note) note[key] = val;
    //     this._notesDb = this._notesDb.map((c) =>
    //         note._id === c._id ? note : c
    //     );
    //     // change the observable data in the service - let all the subscribers know
    //     this._notes$.next(this._sort(this._notesDb));
    // }
    public updateNote(note: Note) {
        this._notesDb = this._notesDb.map((n) =>
            note._id === n._id ? note : n
        );
        this._notes$.next(this._notesDb);
        this.utilService.save(this.NOTES_KEY, this._notesDb);
    }

    public updateNoteByKey(note: Note, key: string, value: any) {
        note[key] = value;
        // console.log('note: ', note);
        this._notesDb = this._notesDb.map((n) =>
            note._id === n._id ? note : n
        );
        this.utilService.save(this.NOTES_KEY, this._notesDb);
        this.loadNotes();
    }

    private _updateNote(note: Note) {
        this._notesDb = this._notesDb.map((n) =>
            note._id === n._id ? note : n
        );
        this.utilService.save(this.NOTES_KEY, this._notesDb);
        this.loadNotes();
    }

    private _addNote(note: Note) {
        // const newNote = new Note(note.type, note.info);
        // if (typeof newNote.setId === 'function') newNote.setId(getRandomId());
        note._id = getRandomId();
        this._notesDb.unshift(note);
        this.utilService.save(this.NOTES_KEY, this._notesDb);
        this.loadNotes();
    }

    private _getById(id: string) {
        return this._notesDb.find((note) => note._id === id);
    }

    private _sort(notes: Note[]): Note[] {
        return notes;
        // return notes.sort((a, b) => {
        //     if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        //         return -1;
        //     }
        //     if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        //         return 1;
        //     }
        //     return 0;
        // });
    }

    private _filter(notes: Note[], term: string) {
        return notes.filter((note: Note) => {
            if (this.isArchivedFilter) return note.isArchived;
            else if (!this.isArchivedFilter && note.isArchived) return false;
            const { title, txt, todos } = note.info;
            const regex = new RegExp(term, 'i');
            if (title) {
                if (regex.test(title)) return true;
            }
            if (txt) {
                if (regex.test(txt)) return true;
            }
            if (todos && todos.length) {
                if (todos.some((todo) => regex.test(todo.txt))) return true;
            }
            return false;
            // return (
            //     (!title || regex.test(title)) ||
            //     (!txt || regex.test(txt)) ||
            //     (!todos || !todos.length || todos.some(todo => regex.test(todo.txt)))
            //   )
        });
        // return notes.filter((note) => {
        //     return (
        //         note.name.toLocaleLowerCase().includes(term) ||
        //         note.phone.toLocaleLowerCase().includes(term) ||
        //         note.email.toLocaleLowerCase().includes(term)
        //     );
        // });
    }

    private _createNotes() {
        let notes = this.utilService.load(this.NOTES_KEY);
        if (!notes || !notes.length) {
            notes = [
                {
                    type: 'txt',
                    info: {
                        title: '',
                        txt: 'עכי',
                    },
                    media: null,
                    _id: 'UXoBH4pl',
                    isPinned: false,
                    labels: [],
                    style: {
                        backgroundColor: '',
                        backgroundImg: '',
                    },
                },
                {
                    type: 'txt',
                    info: {
                        title: '',
                        txt: '',
                    },
                    media: {
                        type: 'img',
                        url: 'http://res.cloudinary.com/dvirco123/image/upload/v1684940100/123_jkjqsf.png',
                    },
                    _id: 'bseTUnis',
                    isPinned: false,
                    labels: [
                        {
                            name: 'Ideas',
                            id: 'l102',
                            isChecked: false,
                        },
                    ],
                    style: {
                        backgroundColor: '',
                        backgroundImg: '',
                    },
                },
                {
                    type: 'txt',
                    info: {
                        title: '',
                        txt: 'fgh',
                    },
                    media: null,
                    _id: 'TT0fQzCv',
                    isPinned: false,
                    labels: [
                        {
                            name: 'Movies',
                            id: 'l103',
                            isChecked: false,
                        },
                    ],
                    style: {
                        backgroundColor: '',
                        backgroundImg: '',
                    },
                },
                {
                    type: 'txt',
                    info: {
                        title: 'Movies ',
                        txt: 'Here i should insert movies ideas, \nbut maybe it is a better idea to use checklist note for that',
                    },
                    media: {
                        type: 'img',
                        url: 'http://res.cloudinary.com/dvirco123/image/upload/v1684840023/signup_ujwobs.png',
                    },
                    _id: 'b4STN0wn',
                    isPinned: false,
                    labels: [
                        {
                            name: 'Movies',
                            id: 'l103',
                            isChecked: false,
                        },
                    ],
                    style: {
                        backgroundColor: '',
                        backgroundImg: '',
                    },
                },
                {
                    _id: 'n101',
                    type: 'txt',
                    isPinned: true,
                    media: null,
                    info: {
                        title: 'Hi there',
                        txt: 'Make me rich! 🙏',
                    },
                    style: {
                        backgroundColor: '#cbf0f8',
                        backgroundImg:
                            'https://www.gstatic.com/keep/backgrounds/notes_light_0609.svg',
                    },
                    labels: [
                        {
                            name: 'Work',
                            id: 'l101',
                            isChecked: false,
                        },
                    ],
                    isArchived: false,
                },
                {
                    _id: 'n102',
                    type: 'todos',
                    isPinned: true,
                    media: null,
                    info: {
                        title: 'Win sprint 3',
                        todos: [
                            {
                                id: '1',
                                txt: 'Avoid shit in the code',
                                isDone: false,
                                doneAt: null,
                            },
                            {
                                id: '2',
                                txt: 'Resolve food from wolt',
                                isDone: true,
                                doneAt: 187111111,
                            },
                            {
                                id: '3',
                                txt: 'Catch brain errors',
                                isDone: false,
                                doneAt: 187111111,
                            },
                            {
                                id: '4',
                                txt: 'Remember to shower',
                                isDone: true,
                                doneAt: 187111111,
                            },
                        ],
                    },
                    style: {
                        backgroundColor: '#aecbfa',
                        backgroundImg: '',
                    },
                    labels: [
                        {
                            name: 'Work',
                            id: 'l101',
                            isChecked: false,
                        },
                    ],
                },
                {
                    _id: 'n103',
                    type: 'txt',
                    isPinned: false,
                    media: {
                        type: 'img',
                        url: 'http://res.cloudinary.com/dvirco123/image/upload/v1685443927/sax_2_pzl40q.png',
                    },
                    info: {
                        title: 'Satruday evening',
                        txt: 'hello there',
                    },
                    style: {
                        backgroundColor: '',
                        backgroundImg:
                            'https://www.gstatic.com/keep/backgrounds/grocery_light_0609.svg',
                    },
                },
                {
                    _id: 'n104',
                    type: 'txt',
                    isPinned: false,
                    media: {
                        type: 'audio',
                        url: 'assets/audio/forest-lullaby.mp3',
                    },
                    info: {
                        txt: '',
                        title: 'Relaxing Music',
                    },
                    style: {
                        backgroundColor: '#f28b82',
                        backgroundImg: '',
                    },
                    labels: [
                        {
                            id: 'l101',
                            name: 'Work',
                            color: '#e03131',
                        },
                    ],
                },
                {
                    _id: 'n105',
                    type: 'txt',
                    isPinned: false,
                    media: {
                        type: 'img',
                        url: 'https://res.cloudinary.com/dvirco123/image/upload/v1658095564/sax_2_afhafq.png',
                    },
                    info: {
                        txt: '',
                        title: '',
                    },
                    style: {
                        backgroundColor: '#ff922b',
                    },
                    labels: [],
                },
                {
                    _id: 'n106',
                    type: 'txt',
                    isPinned: false,
                    media: null,
                    info: {
                        title: 'Check out the paintbrush',
                        txt: 'I owned the canvas',
                    },
                    style: {
                        backgroundColor: '#e8eaed',
                        backgroundImg: '',
                    },
                    labels: [
                        {
                            id: 'l101',
                            name: 'Work',
                            color: '#e03131',
                        },
                    ],
                },
                {
                    _id: 'n107',
                    type: 'txt',
                    isPinned: false,
                    media: {
                        type: 'img',
                        url: 'https://res.cloudinary.com/dvirco123/image/upload/v1669330155/8_nydchf.jpg',
                    },
                    info: {
                        txt: '',
                        title: 'Waiting.....',
                    },
                    style: {
                        backgroundColor: '',
                        backgroundImg: '',
                    },
                },
                {
                    _id: 'n108',
                    type: 'todos',
                    isPinned: false,
                    media: null,
                    info: {
                        title: "What's next...",
                        todos: [
                            {
                                id: '1',
                                txt: 'Improve my CV',
                                isDone: false,
                                doneAt: null,
                            },
                            {
                                id: '2',
                                txt: 'Improve my Github profile',
                                isDone: true,
                                doneAt: null,
                            },
                            {
                                id: '3',
                                txt: 'Remember we can walk',
                                isDone: false,
                                doneAt: 187111111,
                            },
                        ],
                    },
                    style: {
                        backgroundColor: '#d7aefb',
                        backgroundImg:
                            'https://www.gstatic.com/keep/backgrounds/travel_light_0614.svg',
                    },
                    labels: [
                        {
                            name: 'Work',
                            id: 'l101',
                            isChecked: false,
                        },
                    ],
                },
                {
                    _id: 'n109',
                    type: 'txt',
                    isPinned: false,
                    media: null,
                    info: {
                        title: '',
                        txt: '',
                    },
                    style: {
                        backgroundColor: '#f06595',
                    },
                    labels: [],
                },
            ];

            // const pinned = notes.filter((note: Note) => note.isPinned);
            // const unpinned = notes.filter((note: Note) => !note.isPinned);

            // notes = [...pinned, ...unpinned];
        }
        this.utilService.save(this.NOTES_KEY, notes);
        return notes;
    }

    private _createLabels() {
        let labels = this.utilService.load(this.LABELS_KEY);
        if (!labels || !labels.length) {
            labels = [
                {
                    name: 'Work',
                    color: '',
                },
            ];
        }
        this.utilService.save(this.LABELS_KEY, labels);
        return labels;
    }
}

function getRandomId(length = 8): string {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}
