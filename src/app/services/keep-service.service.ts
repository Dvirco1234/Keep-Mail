import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Label, Note } from '../models';
import { AsyncStorageService } from './async-storage-service.service';
import { UtilService } from './util-service.service';

// const notes = [] as Note[];
// const notes: Note[] = ;

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

    private _notes$ = new BehaviorSubject<Note[]>([]);
    public notes$ = this._notes$.asObservable();

    private _labels$ = new BehaviorSubject<Label[]>([]);
    public labels$ = this._labels$.asObservable();

    // private _filterBy$ = new BehaviorSubject<NoteFilter>({ term: '' });
    // public filterBy$ = this._filterBy$.asObservable();
    // public currEditedNote: Note | null = null
    private _currNote$ = new BehaviorSubject<Note | null>(null);
    public currNote$ = this._currNote$.asObservable();

    constructor(
        private utilService: UtilService,
        private storageService: AsyncStorageService
    ) {}

    public loadNotes() {
        // const filterBy = this._filterBy$.getValue();
        let notes = this._notesDb;
        // console.log('labelId: ', this.currLabelId);
        if (this.currLabelId)
            notes = notes.filter(
                (note: Note) =>
                    note.labels?.some((l) => l.id === this.currLabelId) || false
            );
        // console.log('notes: ', notes);

        if (this.searchTerm) notes = this._filter(notes, this.searchTerm);
        this._notes$.next(this._sort(notes as Note[]));
    }
    // public loadNotes() {
    //   let notes = this.storageService.query(this.NOTES_KEY);
    //   if (!notes || !notes.length) {
    //     notes = []
    //     storageService.postMany(this.NOTES_KEY, notes)
    // }
    //    return notes

    //     // this.http.get<notes: Note[]>('URL')
    // }

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
        this.loadNotes()
    }
    public setCurrLabelId(labelId: string) {
        this.currLabelId = labelId;
        this.loadNotes()
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
                    _id: 'n101',
                    type: 'txt',
                    isPinned: true,
                    media: null,
                    info: {
                        title: 'Hi there',
                        txt: 'Make me rich! 🙏',
                    },
                    style: {
                        backgroundColor: '#495057',
                    },
                    labels: [{ id: 'l101', name: 'Work', color: '#e03131' }],
                },
                {
                    _id: 'n102',
                    type: 'todos',
                    isPinned: true,
                    media: null,
                    info: {
                        title: 'Win sprint 3',
                        // title: '',
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
                        backgroundColor: '#40c057',
                    },
                },
                {
                    _id: 'n103',
                    type: 'txt',
                    isPinned: false,
                    media: {
                        type: 'img',
                        // url: 'https://res.cloudinary.com/dvirco123/image/upload/v1658050611/cld-sample-2.jpg',
                        url: 'https://res.cloudinary.com/dvirco123/image/upload/v1672011403/Keep-Mail/background2_clgeb8.png',
                        // url: 'https://media0.giphy.com/media/Hld1RfHBeQDmM/giphy.gif?cid=ecf05e47oja2qakbdabac72p1kj31udw7j8ihd0bdeeag1fo&rid=giphy.gif&ct=g',
                    },
                    info: {
                        title: 'Satruday evening',
                        txt: 'hello there',
                    },
                    style: {
                        backgroundColor: '#228be6',
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
                        title: 'Relaxing Forest lullaby',
                    },
                    style: {
                        backgroundColor: '#f03e3e',
                    },
                    labels: [
                        { name: 'Ideas', id: 'l102', color: '#ae3ec9' },
                        { id: 'l101', name: 'Work', color: '#e03131' },
                    ],
                },
                {
                    _id: 'n105',
                    type: 'txt',
                    isPinned: false,
                    media: {
                        type: 'img',
                        url: 'https://res.cloudinary.com/dvirco123/image/upload/v1658095564/sax_2_afhafq.png',
                        // url: 'https://media3.giphy.com/media/ovxc9FB6VCBJC/giphy.gif?cid=ecf05e47usa0c4l3zo31bhkq41e2jsod8hbjswoxqqojiu93&rid=giphy.gif&ct=g',
                    },
                    info: {
                        txt: '',
                        title: '',
                        // title: 'Add note type: <note-map>',
                    },
                    style: {
                        backgroundColor: '#ff922b',
                    },
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
                        backgroundColor: '#fcc419',
                    },
                    labels: [{ id: 'l101', name: 'Work', color: '#e03131' }],
                },
                {
                    _id: 'n107',
                    type: 'txt',
                    isPinned: false,
                    media: {
                        type: 'img',
                        url: 'https://res.cloudinary.com/dvirco123/image/upload/v1669330155/8_nydchf.jpg',
                        // url: 'https://memegenerator.net/img/instances/47086717.jpg',
                    },
                    info: {
                        txt: '',
                        title: 'Sprint 2 be like',
                    },
                    style: {
                        backgroundColor: '#7950f2',
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
                                txt: "Figure out Vue's warnings 😥",
                                isDone: false,
                                doneAt: null,
                            },
                            {
                                id: '2',
                                txt: 'Sleep in september',
                                isDone: true,
                                doneAt: 187111111,
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
                        backgroundColor: '#ff922b',
                    },
                    labels: [{ name: 'Ideas', id: 'l102', color: '#37b24d' }],
                },
                {
                    _id: 'n109',
                    type: 'txt',
                    isPinned: false,
                    media: null,
                    info: {
                        title: '',
                        txt: '',
                        // title: 'Try to drag me',
                        // txt: 'but not on a pinned note 🙊',
                    },
                    style: {
                        backgroundColor: '#f06595',
                    },
                },
                // {
                //     _id: 'n110',
                //     type: 'video',
                //     isPinned: false,
                //     media: null,
                //     info: {
                //         videoId: 'bpOSxM0rNPM',
                //     },
                //     style: {
                //         backgroundColor: '#15aabf',
                //     },
                // },
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
