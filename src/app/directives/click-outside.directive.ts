import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  @Input('clickOutside') public clickOutsideCallback!: (arg?: any) => void;
  @Input() public clickOutsideArg: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      document.addEventListener('click', this.onClickOutside);
    }, 0);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onClickOutside);
  }

  private onClickOutside = (event: MouseEvent): void => {
    const element = this.elementRef.nativeElement;
    if (!element.contains(event.target)) {
      this.clickOutsideCallback?.(this.clickOutsideArg);
    }
  };
}

// import { Directive, HostListener, ElementRef, Input } from '@angular/core';

// @Directive({
//     selector: '[clickOutside]',
// })
// export class ClickOutsideDirective {
//     @Input() public clickOutside!: (event: MouseEvent) => void;

//     constructor(private elementRef: ElementRef) {}

//     @HostListener('document:click', ['$event'])
//     public onClick(event: MouseEvent): void {
//         const element = this.elementRef.nativeElement;
//         if (!element.contains(event.target)) {
//             // Call the callback function
//             this.clickOutside(event);
//         }
//     }
// }