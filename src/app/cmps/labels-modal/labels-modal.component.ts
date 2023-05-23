import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Label, User } from 'src/app/models';
import { UserService } from 'src/app/services/user-service.service';

@Component({
    selector: 'labels-modal',
    templateUrl: './labels-modal.component.html',
    styleUrls: ['./labels-modal.component.scss'],
})
export class LabelsModalComponent implements AfterViewInit {
    constructor(private userService: UserService) {}
    // @ViewChild('fileInput') dialog!: ElementRef;
    @ViewChild('newLabelInput') newLabelInput!: ElementRef;
    @ViewChildren('labelInput', { read: ElementRef })
    labelInput!: QueryList<ElementRef>;
    // user$!: Observable<User>;
    // subscription!: Subscription
    user!: User;
    isEdit: boolean = false;
    newLabel: string = '';
    labels!: Label[];

    toggleNewLabelEditable(isSave: boolean = false): void {
        if (this.isEdit) {
            if (isSave) {
                //save new label
            }
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
            if (isSave) {
                //save new label
            }
            this.labels[idx].isEditable = false;
            this.labelInput.toArray()[idx].nativeElement.blur();
        } else {
            this.closeLabels();
            this.labels[idx].isEditable = true;
            this.labelInput.toArray()[idx].nativeElement.focus();
        }
    }

    saveLabel() {}

    removeLabel() {}

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
          ...l,  isEditable: false,
        }));
    }
    // get labels(): Label[] {
    //   return this.user['labels'].map((l: string) => ({ name: l, isEditable: false }));
    // }

    ngOnInit(): void {
        // this.user$ = this.userService.user$;
        this.user = this.userService.getLoggedInUser();
        this.initLabels();
        // this.subscription = this.userService.user$.subscribe(user => {
        //       this.user = user
        //   })
    }

    ngAfterViewInit(): void {
        // this.dialog.nativeElement.showModal()
        this.newLabelInput.nativeElement.focus();
    }
}
