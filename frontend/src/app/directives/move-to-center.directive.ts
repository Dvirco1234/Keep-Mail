import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[moveToCenter]'
})
export class MoveToCenterDirective implements OnInit, OnChanges {
  @Input('moveToCenter') animate: boolean = true;

  private originalTransform: string = '';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.originalTransform = this.el.nativeElement.style.transform || '';
    this.animateCard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('animate' in changes) {
      this.animateCard();
    }
  }

  private animateCard(): void {
    const card = this.el.nativeElement;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    const leftOffset = (viewportWidth - cardWidth) / 2 - cardRect.left - 180; //  - (360 / 2) because of the width - from 240px to 600px
    const topOffset = (viewportHeight - cardHeight) / 2 - cardRect.top;

    if (this.animate) {
      card.style.transform = `translate(${leftOffset}px, ${topOffset}px) `;
      // card.style.zIndex = 1
    } else {
      card.style.transform = this.originalTransform;
    }
  }

  @HostListener('transitionend', ['$event'])
  onTransitionEnd(event: TransitionEvent) {
    const card = this.el.nativeElement;
    // card.style.zIndex = 0
    // if (!this.animate) {
    //   card.style.display = 'none';
    //   card.style.transform = this.originalTransform;
    // }
  }
}

// import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

// @Directive({
//   selector: '[moveToCenter]'
// })
// export class MoveToCenterDirective implements OnInit, OnChanges {
//   @Input('moveToCenter') animate: boolean = true;

//   private originalTransform: string = '';

//   constructor(private el: ElementRef) { }

//   ngOnInit(): void {
//     this.originalTransform = this.el.nativeElement.style.transform || '';
//     this.animateCard();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if ('animate' in changes) {
//       this.animateCard();
//     }
//   }

//   private animateCard(): void {
//     const card = this.el.nativeElement;
//     const viewportWidth = window.innerWidth;
//     const viewportHeight = window.innerHeight;
//     const cardRect = card.getBoundingClientRect();
//     const cardWidth = cardRect.width;
//     const cardHeight = cardRect.height;
//     const leftOffset = (viewportWidth - cardWidth) / 2 - cardRect.left - 180; //  - (360 / 2) because of the width - from 240px to 600px
//     const topOffset = (viewportHeight - cardHeight) / 2 - cardRect.top;

//     if (this.animate) {
//       card.style.transform = `translate(${leftOffset}px, ${topOffset}px) `;
//     } else {
//       card.style.transform = this.originalTransform;
//     }
//   }
// }





// import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// @Directive({
//     selector: '[moveToCenter]',
// })
// export class MoveToCenterDirective {
//     private originalTop!: number;
//     private originalLeft!: number;
//     @Input('moveToCenter') animate: boolean = false;
//     constructor(private el: ElementRef) {}

//     ngAfterViewInit() {
//         // Save the card's original position
//         const rect = this.el.nativeElement.getBoundingClientRect();
//         this.originalTop = rect.top + window.pageYOffset;
//         this.originalLeft = rect.left + window.pageXOffset;
//     }

//     @HostListener('click', ['$event'])
//     onClick(event: MouseEvent) {
//         // Calculate the required movement to reach the center
//         if (this.animate) {
//             const cardRect = this.el.nativeElement.getBoundingClientRect();
//             const centerTop = window.innerHeight / 2 - cardRect.height / 2;
//             const centerLeft = window.innerWidth / 2 - cardRect.width / 2;
//             const moveTop = centerTop - this.originalTop;
//             const moveLeft = centerLeft - this.originalLeft;

//             this.el.nativeElement.style.transition = 'transform 0.3s';
//             this.el.nativeElement.style.transform = `translate(${moveLeft}px, ${moveTop}px)`;
//         }
//     }
// }
