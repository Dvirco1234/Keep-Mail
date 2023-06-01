import { Injectable } from '@angular/core';
import { UtilService } from './util-service.service'
import { Label, User } from '../models'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor (
        private utilService: UtilService
    ) { }

    private KEY = 'currUser';
    private USERS_KEY = 'usersDB';
    private users: User[] =
        this.utilService.load(this.USERS_KEY) || []
        // [
            // { name: '', coins: 100, moves: [] },
        // ];
    private loggedInUser!: User | null;
    private _user$ = new BehaviorSubject<User>(
        this.utilService.load(this.KEY) //|| this._getEmptyUser()
    );
    public user$ = this._user$.asObservable();

    private _users$ = new BehaviorSubject<User[]>(this.users);
    public users$ = this._users$.asObservable();

    public getUser() {
        // return this.user$;
        this._user$.next(this.getLoggedInUser())
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
    getLoggedInUser(): User { 
        let user = this.utilService.load(this.KEY)
        if (user) return user
        user = {
            _id: 'u101',
            name: 'Dvir Cohen',
            // labels: ['Work', 'Ideas', 'Movies']
            labels: [
                {name: 'Work', id: 'l101'},
                {name: 'Ideas', id: 'l102'},
                {name: 'Movies', id: 'l103'},
            ]
        }
        this.utilService.save(this.KEY, user)
        return user
    }

    saveLabel(label: Label) {
        const user = this.utilService.load(this.KEY)
        if (label.id) {
            const idx = user.labels.findIndex((l: Label) => l.id === label.id)
            user.labels[idx] = label
        } else {
            label.id = this.utilService.makeId()
            user.labels.push(label)
        }
        this.utilService.save(this.KEY, user)
        this._user$.next(user)
    }

    removeLabel(id: string) {
        const user = this.utilService.load(this.KEY)
        user.labels = user.labels.filter((label: Label) => label.id !== id)
        this.utilService.save(this.KEY, user)
        this._user$.next(user)
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
        return this.logIn(user);
    }

    public logIn(user: User): string | void {
        // if (this.users.find((user) => user))
        this._user$.next(user);
    }

    private _getEmptyUser(): User {
        return {
            // _id: 'u101',
            name: '',
            labels: [],
        };
    }

    
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
        return "hsl(" + 360 * Math.random() + ',' +
            (15 + 70 * Math.random()) + '%,' +
            (75 + 10 * Math.random()) + '%)'
    }
}
