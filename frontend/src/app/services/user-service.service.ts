import { Injectable } from '@angular/core';
import { UtilService } from './util-service.service';
import { Label, User } from '../models';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser';
const BASE_URL =
    process.env['NODE_ENV'] === 'production'
        ? '/api/'
        : '//localhost:3030/api/';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private utilService: UtilService, private http: HttpClient) {}

    private KEY = 'currUser';
    private USERS_KEY = 'usersDB';
    private users: User[] = this.utilService.load(this.USERS_KEY) || [];

    private guest = {
        _id: 'guest',
        fullname: 'Hello guest',
        imgUrl: '',
        labels: [],
        username: 'guest@gmail.com',
    };
    private loggedInUser!: User | null;
    //TODO: need to add users
    private _user$ = new BehaviorSubject<User>(
        this.utilService.load(this.KEY) || this.guest //|| this._getEmptyUser()
    );
    public user$ = this._user$.asObservable();

    private _users$ = new BehaviorSubject<User[]>(this.users);
    public users$ = this._users$.asObservable();

    // public getUser() {
    //     // return this.user$;
    //     this._user$.next(this.getLoggedInUser());
    // }

    public isLoggedInUser(): boolean {
        return true;
    }

    // getLoggedInUser(): void {
    //     const user = this.utilService.load(this.KEY)
    //     if (user) this._user$.next(user)
    //     else this._user$.next({
    //         _id: 'u101',
    //         name: 'Dvir Cohen',
    //         labels: ['Work', 'Ideas', 'Movies']
    //     })
    // }
    // getLoggedInUser(): User | null {
    //     const user = this.utilService.load(this.KEY);
    //     return user;
    // }

    //OBSERVABLE
    // getLoggedInUser(): User {
    //     let user = this.utilService.load(this.KEY);
    //     if (user) return user;
    //     user = {
    //         _id: 'u101',
    //         fullname: 'Hello guest',
    //         imgUrl: '',
    //         labels: [],
    //         username: 'guest@gmail.com',
    //     };
    //     return user;
    // }
    getLoggedInUser(): User {
        let user = this.utilService.load(this.KEY);
        if (!user) user = this.guest;
        return user;
    }

    // DEMO USER
    // getLoggedInUser(): User {
    //     let user = this.utilService.load(this.KEY);
    //     if (user) return user;
    //     user = {
    //         _id: 'u101',
    //         fullname: 'Dvir Cohen',
    //         // imgUrl: 'https://res.cloudinary.com/dvirco123/image/upload/v1686137184/Keeper/me_tjm1zw.jpg',
    //         imgUrl: '',
    //         // labels: ['Work', 'Ideas', 'Movies']
    //         labels: [
    //             { name: 'Work', id: 'l101' },
    //             { name: 'Ideas', id: 'l102' },
    //             { name: 'Movies', id: 'l103' },
    //         ],
    //         username: 'dvirco123@gmail.com',
    //     };
    //     this.utilService.save(this.KEY, user);
    //     return user;
    // }

    // saveLabel(label: Label) {
    //     const user = this.getLoggedInUser()
    //     if (label.id) {
    //         const idx = user['labels'].findIndex((l: Label) => l.id === label.id);
    //         user['labels'][idx] = label;
    //     } else {
    //         label.id = this.utilService.makeId();
    //         user['labels'].push(label);
    //     }
    //     this.utilService.save(this.KEY, user);
    //     this._user$.next(user);
    // }

    // removeLabel(id: string) {
    //     const user = this.getLoggedInUser()
    //     user['labels'] = user['labels'].filter((label: Label) => label.id !== id);
    //     this.utilService.save(this.KEY, user);
    //     this._user$.next(user);
    // }
    saveLabel(label: Label) {
        console.log('label: ', label);
        const user = this.getLoggedInUser()
        if (label.id) {
            const idx = user['labels'].findIndex((l: Label) => l.id === label.id);
            user['labels'][idx] = label;
        } else {
            label.id = this.utilService.makeId();
            user['labels'].push(label);
        }
        this.updateUser(user);
    }
    
    removeLabel(id: string) {
        const user = this.getLoggedInUser()
        user['labels'] = user['labels'].filter((label: Label) => label.id !== id);
        this.updateUser(user);
        // this.utilService.save(this.KEY, user);
        // this._user$.next(user);
    }

    async updateUser(user: User) {
        const url = `${BASE_URL}user/${user['id']}`;
        try {
            const updatedUser = await lastValueFrom(
                this.http.put<any>(url, user)
            );
            console.log('updatedUser: ', updatedUser);
            this.utilService.save(this.KEY, updatedUser);
            this._user$.next(updatedUser);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    // public getUsers() {
    //     return this.users$;
    // }

    public getUsers() {
        return this.users;
    }

    public signUp(user: User) {
        // if (user._id) return this.logIn(user);
        user['_id'] = 'u' + (Date.now() % 1000);
        this.users.push(user);
        this.utilService.save(this.USERS_KEY, this.users);
        // return this.logIn(user);
    }

    // public logIn(user: User): string | void {
    //     // if (this.users.find((user) => user))
    //     this._user$.next(user);
    // }
    public async signup(credentials: {
        username: string;
        password: string;
        fullname: string;
    }) {
        console.log('credentials: ', credentials);
        const url = `${BASE_URL}auth/signup`;
        try {
            const user = await lastValueFrom(
                this.http.post<any>(url, credentials)
            );
            console.log('user: ', user);
            this.utilService.save(this.KEY, user);
            this._user$.next(user);
            // saveLocalUser(user);
            return user;
        } catch (error) {
            // console.error(error);
            throw error;
        }
    }
    
    public async login(credentials: { username: string; password: string }) {
        console.log('credentials: ', credentials);
        const url = `${BASE_URL}auth/login`;
        try {
            const user = await lastValueFrom(
                this.http.post<any>(url, credentials)
                );
                console.log('user: ', user);
                this.utilService.save(this.KEY, user);
                this._user$.next(user);
                // saveLocalUser(user);
            return user;
        } catch (error) {
            // console.error(error);
            throw error;
        }
    }

    public async logout() {
        const url = `${BASE_URL}auth/logout`;
        // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
        localStorage.removeItem(this.KEY);
        try {
            const res = await lastValueFrom(this.http.post<any>(url, null));
            console.log('res: ', res);
            this._user$.next(this.guest);
        } catch (error) {
            console.error(error);
        }
    }

    // private _getEmptyUser(): User {
    //     return {
    //         // _id: 'u101',
    //         name: '',
    //         labels: [],
    //     };
    // }

    // private _createLabels() {
    //     let labels = this.utilService.load(this.LABELS_KEY);
    //     if (!labels || !labels.length) {
    //         labels = [
    //             {
    //                 name: 'Work',
    //                 color: ''
    //             },
    //         ];
    //     }
    //     this.utilService.save(this.LABELS_KEY, labels);
    //     return labels;
    // }

    private _getColor() {
        return (
            'hsl(' +
            360 * Math.random() +
            ',' +
            (15 + 70 * Math.random()) +
            '%,' +
            (75 + 10 * Math.random()) +
            '%)'
        );
    }
}

function saveLocalUser(user: User) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
    return user;
}

function getLoggedinUser() {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null';
    return JSON.parse(user);
}
