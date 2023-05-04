import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Note } from '../models'
import { KeepService } from './keep-service.service'

@Injectable({
  providedIn: 'root'
})
export class NoteResolver implements Resolve<Note> {
    constructor (private keepService: KeepService) { }
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Note> {
        const id = route.params['id']
        return this.keepService.getNoteById(id)
    }
}
