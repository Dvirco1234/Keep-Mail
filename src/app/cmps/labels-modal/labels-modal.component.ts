import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { Label, User } from 'src/app/models';
import { UserService } from 'src/app/services/user-service.service';

@Component({
    selector: 'labels-modal',
    templateUrl: './labels-modal.component.html',
    styleUrls: ['./labels-modal.component.scss'],
    providers: [ClickOutsideDirective],
})
export class LabelsModalComponent implements AfterViewInit {
    constructor(private userService: UserService, private router: Router) {}
    // @ViewChild('fileInput') dialog!: ElementRef;
    @ViewChild('newLabelInput') newLabelInput!: ElementRef;
    @ViewChildren('labelInput', { read: ElementRef })
    labelInput!: QueryList<ElementRef>;
    // user$!: Observable<User>;
    // subscription!: Subscription
    // isModalOpen: boolean = true;
    user!: User;
    isEdit: boolean = false;
    newLabel: string = '';
    labels!: Label[];

    toggleNewLabelEditable(isSave: boolean = false): void {
        if (this.isEdit) {
            if (isSave) this.saveLabel({ name: this.newLabel } as Label);
            //clear input
            this.newLabel = '';
            this.isEdit = false;
            this.newLabelInput.nativeElement.blur();
        } else {
            this.closeLabels();
            this.isEdit = true;
            this.newLabelInput.nativeElement.focus();
        }
    }
    toggleLabelEditable(
        idx: number,
        isSave: boolean = false,
        ev: Event | undefined = undefined
    ): void {
        if (this.labels[idx].isEditable && ev?.type !== 'focus') {
            // if (isSave) this.saveLabel(this.user['labels'][idx]);
            if (isSave) this.saveLabel(this.labels[idx]);
            this.labels[idx].isEditable = false;
            this.labelInput.toArray()[idx].nativeElement.blur();
        } else {
            this.closeLabels();
            this.labels[idx].isEditable = true;
            this.labelInput.toArray()[idx].nativeElement.focus();
        }
    }

    saveLabel(label: Label) {
        console.log('label: ', label);
        delete label.isEditable;
        delete label['mouseover'];
        this.userService.saveLabel(label);
        this.loadUser();
    }

    removeLabel(id: string) {
        this.userService.removeLabel(id);
        this.loadUser();
    }

    closeLabels() {
        // this.labels.forEach((label) => (label.isEditable = false));
        this.labels.forEach((label, index) => {
            label.isEditable = false;
            label.name = this.user['labels'][index].name;
        });
        this.isEdit = false;
        this.newLabel = '';
    }

    initLabels() {
        this.labels = this.user['labels'].map((l: Label) => ({
            // id: l.id,
            // name: l.name,
            // isEditable: false,
            ...l,
            isEditable: false,
        }));
    }

    loadUser() {
        this.user = this.userService.getLoggedInUser();
        this.labels = this.user['labels'].map((l: Label) => ({
            ...l,
            isEditable: false,
        }));
    }

    closeLabelsModal() {
        // console.log('this.router.url: ', this.router.url);
        this.router.navigateByUrl(`/keep`);
    }
    // get labels(): Label[] {
    //   return this.user['labels'].map((l: string) => ({ name: l, isEditable: false }));
    // }

    ngOnInit(): void {
        this.loadUser();
        // this.user$ = this.userService.user$;
        // this.user = this.userService.getLoggedInUser();
        // this.initLabels();
        // this.subscription = this.userService.user$.subscribe(user => {
        //       this.user = user
        //   })
    }

    ngAfterViewInit(): void {
        // this.dialog.nativeElement.showModal()
        this.newLabelInput.nativeElement.focus();
    }
}
