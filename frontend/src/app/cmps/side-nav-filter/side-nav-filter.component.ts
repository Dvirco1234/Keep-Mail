import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Label, User } from 'src/app/models';
import { KeepService } from 'src/app/services/keep-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
    selector: 'side-nav-filter',
    templateUrl: './side-nav-filter.component.html',
    styleUrls: ['./side-nav-filter.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavFilterComponent implements OnInit {
    constructor(
        private userService: UserService,
        private keepService: KeepService
    ) {}
    user$!: Observable<User>;
    subscription!: Subscription;
    user!: User;
    isMenuOpenHover: boolean = false;
    isHover: boolean = false;
    hoverTimeoutId!: ReturnType<typeof setTimeout>;
    navLinks = [
        { icon: 'bulb', act: this.try.bind(this), txt: 'Notes', link: '/keep' },
        {
            icon: 'edit',
            act: this.try.bind(this),
            txt: 'Edit labels',
            link: '/keep/labels-modal',
        },
        {
            icon: 'archive',
            act: this.try.bind(this),
            txt: 'Archive',
            link: '/keep/archive',
        },
        {
            icon: 'trash',
            act: this.try.bind(this),
            txt: 'Trash',
            link: '/keep/trash',
        },
    ];

    get isMenuOpen() {
        return this.keepService.isSideMenuOpen;
    }

    // get labels() {
    //     let labels = this.userService.getLoggedInUser()['labels'];
    //     if (labels?.length) labels = labels.map((label: Label) => ({
    //         icon: 'label', act: this.try.bind(this), txt: label.name, link: `/keep/label/${label.id}`,
    //     })) || []
    //     return labels
    // }
    setNavLinks() {
        let labels = this.user['labels'] || [];
        if (labels?.length) labels = labels.map((label: Label) => ({
            icon: 'label', act: this.try.bind(this), txt: label.name, link: `/keep/label/${label.id}`,
        }))
        this.navLinks = [
            {
                icon: 'bulb',
                act: this.try.bind(this),
                txt: 'Notes',
                link: '/keep',
            },
            ...labels,
            {
                icon: 'edit',
                act: this.try.bind(this),
                txt: 'Edit labels',
                link: '/keep/labels-modal',
            },
            {
                icon: 'archive',
                act: this.try.bind(this),
                txt: 'Archive',
                link: '/keep/archive',
            },
            {
                icon: 'trash',
                act: this.try.bind(this),
                txt: 'Trash',
                link: '/keep/trash',
            }
        ];
    }

    onMouseOver() {
        if (this.isMenuOpen) return;
        this.isHover = true;
        this.hoverTimeoutId = setTimeout(() => { 
            if (!this.isHover) return;
            this.isMenuOpenHover = true;
        }, 200)
    }
    
    onMouseLeave() {
        if (this.isMenuOpen) return;
        this.isHover = false;
        clearTimeout(this.hoverTimeoutId);
        this.isMenuOpenHover = false;
    }

    try() {
        console.log('try');
    }
    ngOnInit(): void {
        this.subscription = this.userService.user$.subscribe((user) => {
            if (!user) return;
            this.user = user;
            this.setNavLinks();
        });
    }
    // ngOnInit(): void {
    //     let labels = this.userService.getLoggedInUser()['labels'];
    //     if (labels?.length) labels = labels.map((label: Label) => ({
    //         icon: 'label', act: this.try.bind(this), txt: label.name, link: `/keep/label/${label.id}`,
    //     }))
    //     this.navLinks = [
    //         { icon: 'bulb', act: this.try.bind(this), txt: 'Notes', link: '/keep', },
    //         { icon: 'edit', act: this.try.bind(this), txt: 'Edit labels', link: '/keep/labels-modal', },
    //         ...labels,
    //         { icon: 'archive', act: this.try.bind(this), txt: 'Archive', link: '/keep/archive', },
    //         { icon: 'trash', act: this.try.bind(this), txt: 'Trash', link: '/keep/trash', },
    //     ]
    // }
}
