import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'svg-icon',
    templateUrl: './svg-icon.component.html',
    styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent implements OnInit {
    constructor() {}
    //size path small 14 large 19
    //size svg small 19-21 large 24
    @Input() icon!: {
        name: string;
        isLarge?: boolean;
        size?: string;
        class?: string;
    };
    ngOnInit(): void {}
}
