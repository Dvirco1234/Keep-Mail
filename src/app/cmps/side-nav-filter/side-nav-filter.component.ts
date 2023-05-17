import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'side-nav-filter',
    templateUrl: './side-nav-filter.component.html',
    styleUrls: ['./side-nav-filter.component.scss'],
})
export class SideNavFilterComponent implements OnInit {
    constructor() {}

    navLinks = [
        { icon: 'bulb', act: this.try.bind(this), txt: 'Notes', link: '/keep', },
        { icon: 'edit', act: this.try.bind(this), txt: 'Edit labels', link: '/keep/labels-modal', },
        { icon: 'archive', act: this.try.bind(this), txt: 'Archive', link: '/keep/archive', },
        { icon: 'trash', act: this.try.bind(this), txt: 'Trash', link: '/keep/trash', },
    ];

    try() {
        console.log('try');
    }
    ngOnInit(): void {}
}
