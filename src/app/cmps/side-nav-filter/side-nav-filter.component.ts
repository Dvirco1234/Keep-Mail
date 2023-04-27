import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'side-nav-filter',
    templateUrl: './side-nav-filter.component.html',
    styleUrls: ['./side-nav-filter.component.scss'],
})
export class SideNavFilterComponent implements OnInit {
    constructor() {}

    navLinks = [
        { icon: 'bulb', act: this.try.bind(this), txt: 'Notes' },
        { icon: 'edit', act: this.try.bind(this), txt: 'Edit labels' },
        { icon: 'archive', act: this.try.bind(this), txt: 'Archive' },
        { icon: 'trash', act: this.try.bind(this), txt: 'Trash' },
    ];

    try() {
        console.log('try');
    }
    ngOnInit(): void {}
}
