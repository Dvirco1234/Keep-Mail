import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as Masonry from 'masonry-layout';

@Directive({
    selector: '[masonry]',
})
export class MasonryDirective implements AfterViewInit, OnDestroy {
    private masonry: Masonry | any;

    constructor(private element: ElementRef) {}

    ngAfterViewInit(): void {
        this.masonry = new Masonry(this.element.nativeElement, {
            // Options go here (e.g. columnWidth, itemSelector, etc.)
        });

        this.masonry.on('layoutComplete', () => {
            // Update the layout when items are added or removed
            this.masonry.layout();
        });
    }

    ngOnDestroy(): void {
        // Destroy the Masonry instance when the directive is destroyed
        this.masonry.destroy();
    }
}

// import {
//     Directive,
//     ElementRef,
//     AfterViewInit,
//     OnDestroy ,
// } from '@angular/core';
// import * as Masonry from 'masonry-layout';

// @Directive({
//     selector: '[masonry]',
// })
// export class MasonryDirective implements  AfterViewInit, OnDestroy{
//   private masonry: Masonry| any;

//     constructor(private element: ElementRef) {}

//     ngAfterViewInit(): void {
//         // Initialize Masonry layout on the element
//         this.masonry = new Masonry(this.element.nativeElement, {
//             // Options go here (e.g. columnWidth, itemSelector, etc.)
//         });
//     }

//     this.masonry.on('layoutComplete', () => {
//       // Update the layout when items are added or removed
//       this.masonry.layout();
//     });

//   ngOnDestroy(): void {
//     // Destroy the Masonry instance when the directive is destroyed
//     this.masonry.destroy();
//   }
// }
