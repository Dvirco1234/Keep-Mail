import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';

@Component({
    selector: 'keep-app',
    templateUrl: './keep-app.component.html',
    styleUrls: ['./keep-app.component.scss'],
})
export class KeepAppComponent implements OnInit {
    constructor(
        private keepService: KeepService,
        private route: ActivatedRoute
    ) {}
    // notes!: Note[];
    notes$!: Observable<Note[]>;
    currNote$!: Observable<Note | null>;
    currEditedNote: Note | null = null;
    labelId!: string;
    currRoute: string = '';

    isArchiveRoute!: boolean;
    isTrashRoute!: boolean;

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.labelId = params['labelId'];
            // this.keepService.setCurrLabelId(this.labelId);
            this.keepService.setFilterBy({ labelId: this.labelId || '' });
        });
        // this.route.firstChild?.paramMap.subscribe(params => {
        //     const childSegment = params.get('childSegment');
        //     console.log('childSegment: ', childSegment);
        //   });
        this.route.url.subscribe((segments) => {
            const currentRoute = segments[segments.length - 1].path;
            this.currRoute = currentRoute;
            this.keepService.setCurrRoute(currentRoute);

            this.isArchiveRoute = currentRoute === 'archive';
            this.isTrashRoute = currentRoute === 'trash';
        });
        
        this.notes$ = this.keepService.notes$;
        this.currNote$ = this.keepService.currNote$;
        // console.log('this.notes$: ', this.notes$);
        // this.keepService.notes$.subscribe(notes => console.log('notes', notes));
    }

    updateNote({ note, key, value }: { note: Note; key: string; value: any }) {
        this.keepService.updateNoteByKey(note, key, value);
    }
}
