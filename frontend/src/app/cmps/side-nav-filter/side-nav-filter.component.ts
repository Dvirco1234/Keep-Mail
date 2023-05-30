import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/models'
import { UserService } from 'src/app/services/user-service.service'

@Component({
    selector: 'side-nav-filter',
    templateUrl: './side-nav-filter.component.html',
    styleUrls: ['./side-nav-filter.component.scss'],
})
export class SideNavFilterComponent implements OnInit {
    constructor(private userService: UserService) {}

    navLinks = [
        { icon: 'bulb', act: this.try.bind(this), txt: 'Notes', link: '/keep', },
        { icon: 'edit', act: this.try.bind(this), txt: 'Edit labels', link: '/keep/labels-modal', },
        { icon: 'archive', act: this.try.bind(this), txt: 'Archive', link: '/keep/archive', },
        { icon: 'trash', act: this.try.bind(this), txt: 'Trash', link: '/keep/trash', },
    ];

    try() {
        console.log('try');
    }
    ngOnInit(): void {
        let labels = this.userService.getLoggedInUser()['labels'];
        if (labels?.length) labels = labels.map((label: Label) => ({
            icon: 'label', act: this.try.bind(this), txt: label.name, link: `/keep/label/${label.id}`,
        })) 
        this.navLinks = [
            { icon: 'bulb', act: this.try.bind(this), txt: 'Notes', link: '/keep', },
            { icon: 'edit', act: this.try.bind(this), txt: 'Edit labels', link: '/keep/labels-modal', },
            ...labels,
            { icon: 'archive', act: this.try.bind(this), txt: 'Archive', link: '/keep/archive', },
            { icon: 'trash', act: this.try.bind(this), txt: 'Trash', link: '/keep/trash', },
        ]
    }
}
