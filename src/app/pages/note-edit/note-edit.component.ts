import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { Note } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';

@Component({
    selector: 'note-edit',
    templateUrl: './note-edit.component.html',
    styleUrls: ['./note-edit.component.scss'],
    providers: [ClickOutsideDirective],
})
export class NoteEditComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private keepService: KeepService
    ) {}

    @ViewChild('noteEdit') noteEdit!: ElementRef;

    isShow = false;
    note!: Note;
    destroy$: Subject<boolean> = new Subject();
    subscription!: Subscription;

    async ngOnInit() {
        this.subscription = this.route.data
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.note = data['note'];
                this.keepService.setCurrNote(this.note);
                console.log('this.note: ', this.note);
            });
    }

    closeEdit() {
        this.router.navigateByUrl('/keep');
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.isShow = true;
            const element = this.noteEdit.nativeElement;
            element.classList.add('show');
        });
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe()
        this.keepService.setCurrNote(null);
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
