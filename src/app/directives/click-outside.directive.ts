// import { Directive, HostListener, ElementRef } from '@angular/core';

// @Directive({
//     selector: '[clickOutside]',
// })
// export class ClickOutsideDirective {
//     constructor(private elementRef: ElementRef) {}

//     @HostListener('document:click', ['$event'])
//     public onClick(event: MouseEvent): void {
//         const modalElement = this.elementRef.nativeElement;
//         console.log('modalElement: ', modalElement);
//         if (!modalElement.contains(event.target)) {
//             // Close the modal
//             modalElement.close(event);
//         }
//     }
// }

import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
})
export class ClickOutsideDirective {
    @Input() public clickOutside!: (event: MouseEvent) => void;

    constructor(private elementRef: ElementRef) {}

    @HostListener('document:click', ['$event'])
    public onClick(event: MouseEvent): void {
        const element = this.elementRef.nativeElement;
        if (!element.contains(event.target)) {
            // Call the callback function
            this.clickOutside(event);
        }
    }
}
