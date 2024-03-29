import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    lastValueFrom,
    of,
    throwError,
} from 'rxjs';
import { Label, Note } from '../models';
import { AsyncStorageService } from './async-storage-service.service';
import { UtilService } from './util-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user-service.service'

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
    private _notesDb: Note[] = [];

    // public searchTerm: string = '';
    // public currLabelId: string = '';
    public currRoute: string = '';
    // public isArchivedFilter: boolean = false;
    public isTrashNotes: boolean = false;
    public filterBy = {
        labelId: '',
        userId: '',
        searchTerm: '',
        archiveOnly: false,
        isTrash: false,
    }

    public isSideMenuOpen: boolean = true;

    private _notes$ = new BehaviorSubject<Note[]>([]);
    public notes$ = this._notes$.asObservable();

    private _currNote$ = new BehaviorSubject<Note | null>(null);
    public currNote$ = this._currNote$.asObservable();

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    httpStringHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'text/plain; charset=utf-8',
        }),
    };

    constructor(private http: HttpClient, private userService: UserService) {}

    public loadNotes(): void {
        const params = this.filterBy
        params.userId = this.userService.getLoggedInUser()._id;
        this.http.get(`${BASE_URL}note`, { params }).subscribe(
            (notes) => {
                this._notesDb = notes as Note[];
                // let filteredNotes = this._notesDb;
                // if (this.filterBy.labelId) {
                //     filteredNotes = this._notesDb.filter(
                //         (note: Note) =>
                //             note.labels?.some(
                //                 (l) => l.id === this.filterBy.labelId
                //             ) || false
                //     );
                // }

                // filteredNotes = this._filter(this._notesDb);
                // this._notes$.next(filteredNotes);
                this._notes$.next(this._notesDb);
            },
            (error) => {
                console.error(error);
                // this._notes$.next(this._notesDb);
            }
        );
    }

    public getNoteById(id: string): Observable<Note> {
        const url = `${BASE_URL}note/${id}`;
        return this.http.get<Note>(url);
    }

    public async removeNote(id: string) {
        const note = await lastValueFrom(this.getNoteById(id));
        if (!note.deletedAt) {
            await this.updateNoteByKey(note, 'deletedAt', Date.now())
            return this.loadNotes();
        }
        const url = `${BASE_URL}note/${id}`;
        try {
            const res = await lastValueFrom(
                this.http.delete<{ removedId: string }>(url)
            );
            this._notesDb = this._notesDb.filter(
                (note) => note._id !== res.removedId
            );
            this._notes$.next(this._notesDb);
        } catch (error) {
            console.error(error);
        }
    }

    public saveNote(note: Note) {
        return note._id ? this._updateNote(note) : this._addNote(note);
    }

    public setFilterBy(filterBy: {[key: string]: string | boolean}) {
        this.filterBy = { ...this.filterBy, ...filterBy };
        console.log('heree setFilterBy');
        this.loadNotes();
    }

    // public setSearchFilter(term: string) {
    //     this.filterBy.searchTerm = term;
    //     const notes = this._filter(this._notesDb);
    //     this._notes$.next(notes);
    // }
    // public setCurrLabelId(labelId: string) {
    //     this.filterBy.labelId = labelId;
    //     if (!this.filterBy.labelId) return this._notes$.next(this._filter(this._notesDb));
    //     const notes = this._notesDb.filter((note: Note) => note.labels?.some((l) => l.id === this.filterBy.labelId));
    //     this._notes$.next(this._filter(notes));
    // }
    public setCurrRoute(route: string) {
        if (route === 'keep' || route === 'archive' || route === 'trash') {
            this.currRoute = route;
            this.filterBy.archiveOnly = route === 'archive';
            this.filterBy.isTrash = route === 'trash';
            console.log('heree setCurrRoute');
            
            this.loadNotes();
        }
    }
    // public setCurrRoute(route: string) {
    //     if (route === 'keep' || route === 'archive' || route === 'trash') {
    //         this.currRoute = route;
    //         this.filterBy.archiveOnly = route === 'archive';
    //         const notes = this._filter(this._notesDb);
    //         this._notes$.next(notes);
    //     }
    // }

    public async updateNote(note: Note) {
        note.lastEditedAt = Date.now();
        const url = `${BASE_URL}note/${note._id}`;
        try {
            const updatedNote = await lastValueFrom(
                this.http.put<any>(url, note)
            );
            this._notesDb = this._notesDb.map((n) =>
                updatedNote._id === n._id ? updatedNote : n
            );
            this._notes$.next(this._notesDb);
        } catch (error) {
            console.error(error);
        }
    }

    public async updateNoteByKey(note: Note, key: string, value: any) {
        const url = `${BASE_URL}note/by-key/${note._id}`;
        try {
            const updatedNote = await lastValueFrom(
                this.http.put<any>(url, { key, value })
            );
            this._notesDb = this._notesDb.map((n) =>
                updatedNote._id === n._id ? updatedNote : n
            );
            this._notes$.next(this._notesDb);
        } catch (error) {
            console.error(error);
        }
    }

    public toggleSideMenu() {
        this.isSideMenuOpen = !this.isSideMenuOpen;
    }

    private async _updateNote(note: Note) {
        note.lastEditedAt = Date.now();
        const url = `${BASE_URL}note/${note._id}`;
        try {
            const updatedNote = await lastValueFrom(
                this.http.put<any>(url, note)
            );
            this._notesDb = this._notesDb.map((n) =>
                updatedNote._id === n._id ? updatedNote : n
            );
            this._notes$.next(this._notesDb);
        } catch (error) {
            console.error(error);
        }
    }

    private async _addNote(note: Note) {
        note.lastEditedAt = Date.now();
        note.createdAt = Date.now();
        const url = `${BASE_URL}note`;
        try {
            console.log('here adding');
            
            const addedNote = await lastValueFrom(
                this.http.post<any>(url, note)
                );
                this._notesDb.unshift(addedNote);
                console.log('this._notesDb: ', this._notesDb);
                this._notes$.next(this._notesDb);
                console.log('addedNote: ', addedNote);
        } catch (error) {
            console.error(error);
        }
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
            userId: '',
            isPinned: false,
            isArchived: false,
            labels: [],
            style: { backgroundColor: '', backgroundImg: '' },
            lastEditedAt: Date.now(),
            deletedAt: null,
        };
    }

    private _filter(notes: Note[]) {
        const term = this.filterBy.searchTerm;
        return notes.filter((note: Note) => {
            if (this.filterBy.archiveOnly) return note.isArchived;
            else if (!this.filterBy.archiveOnly && note.isArchived) return false;
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
        });
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
