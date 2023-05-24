import {
    Directive,
    ElementRef,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[moveModalToCenter]',
})
export class MoveModalToCenterDirective implements OnInit, OnChanges {
    @Input('moveModalToCenter') animate: boolean = true;
    @Input() modalRef: ElementRef | undefined;

    private originalTransform: string = '';

    constructor(private el: ElementRef) {}

    leftOffset!: number;
    topOffset!: number;
    ngOnInit(): void {
        this.originalTransform = this.el.nativeElement.style.transform || '';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('animate' in changes) {
            if (this.animate) {
                this.moveModalToCard();
                setTimeout(() => {
                    this.moveToCenter();
                });
            } else {
                // this.moveBack();
                this.resetModal();
            }
        }
    }

    private moveModalToCard(): void {
        const card = this.el.nativeElement;
        // const modal = this.modalRef?.nativeElement || document.getElementById('edit-modal');
        const modal = document.getElementById('edit-modal');
        const modalContent = document.querySelector(
            '.add-note.edit-mode'
        ) as HTMLElement;
        // console.log('modalContent: ', modalContent);
        const cardRect = card.getBoundingClientRect();
        // console.log('cardRect: ', cardRect);

        // Store card position and size
        const cardPosition = {
            top: cardRect.top,
            left: cardRect.left,
            width: cardRect.width,
            height: cardRect.height,
        };

        // Position and size modal over card
        if (modal) {
            modal.style.top = `${cardPosition.top + cardRect.height / 2}px`;
            modal.style.left = `${cardPosition.left + cardRect.width / 2}px`;
            // modal.style.transform = `translate(50%, calc(50% - 32px))`;
            // Show modal
            modal.style.opacity = '1';
        }
        if (modalContent) {
            modalContent.style.width = `${cardRect.width}px`;
            modalContent.style.minWidth = `${cardRect.width}px`;
            modalContent.style.overflow = 'hidden';
            modalContent.style.maxHeight = `${cardRect.height}px`;
            // modalContent.style.height = `${cardRect.height}px`;
        }
    }

    private moveToCenter(): void {
        const card = document.getElementById('edit-modal');
        // console.log('card: ', card);
        const modalContent = document.querySelector(
            '.add-note.edit-mode'
        ) as HTMLElement;
        // if (modalContent)
        //     modalContent.style.transition = 'width 0.4s 0.1s, height 0.4s 0.1s';
        if (modalContent) modalContent.style.width = '600px';
        // setTimeout(() => {
        //     if (modalContent) modalContent.style.height = 'auto';
        // }, 300);
        const scrollWrapper = modalContent.querySelector('.scroll-wrapper') as HTMLElement;
        setTimeout(() => {
            if (scrollWrapper) scrollWrapper.style.overflow = 'auto';
        }, 500);
        const contentRect = modalContent.getBoundingClientRect();

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const cardRect = card?.getBoundingClientRect();
        if (!cardRect) return;
        this.leftOffset =
            (viewportWidth - contentRect.width) / 2 - cardRect.left; //  - (360 / 2) because of the width - from 240px to 600px
        this.topOffset =
            (viewportHeight - contentRect.height) / 2 - cardRect.top;

        if (card) card.style.transition = 'transform 0.4s 0.1s';
        if (card)
          card.style.transform = `translate(${this.leftOffset}px, ${this.topOffset}px) `;
        // if (card) card.style.transform = `translateX(${leftOffset}px`;

        // if (this.animate) {
        //   if(card) card.style.transform = `translate(${leftOffset}px, ${topOffset}px) `;
        // } else {
        //   if(card) card.style.transform = this.originalTransform;
        // }
    }

    private resetModal(): void {
        const modal = document.getElementById('edit-modal');
        const modalContent = document.querySelector(
          '.add-note.edit-mode'
          ) as HTMLElement;
          if (modal)
            modal.style.transform = `translate(0px, 0px) `;

        if (modalContent) modalContent.style.width = '600px';
        if (modalContent) modalContent.style.height = 'auto';
        // Hide modal
        // if (modal) modal.style.opacity = '0';

        // Reset modal position and size
        // if (modal) modal.style.top = '0';
        // if (modal) modal.style.left = '0';
        // if (modalContent) modalContent.style.width = 'auto';
        // if (modalContent) modalContent.style.height = 'auto';
    }

    // @HostListener('click', ['$event'])
    // onClick(event: MouseEvent) {
    //     if (this.animate) {
    //         this.moveModalToCard();
    //     }
    // }

    // @HostListener('modalClose')
    // onModalClose() {
    //     if (this.animate) {
    //         this.resetModal();
    //     }
    // }
}

// import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';

// @Directive({
//   selector: '[moveModalToCenter]'
// })
// export class MoveModalToCenterDirective implements OnInit, OnChanges {
//   @Input('moveModalToCenter') animate: boolean = true;

//   private originalTransform: string = '';
//   private cardPosition: { top: number, left: number, width: number, height: number } | null = null;

//   constructor (private el: ElementRef) { }

//   ngOnInit(): void {
//     this.originalTransform = this.el.nativeElement.style.transform || ''
//     this.animateCard()
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if ('animate' in changes) {
//       this.animateCard()
//     }
//   }

//   private animateCard(): void {
//     const card = this.el.nativeElement
//     const viewportWidth = window.innerWidth
//     const viewportHeight = window.innerHeight
//     const cardRect = card.getBoundingClientRect()
//     const cardWidth = cardRect.width
//     const cardHeight = cardRect.height
//     const leftOffset = (viewportWidth - cardWidth) / 2 - cardRect.left - 180 //  - (360 / 2) because of the width - from 240px to 600px
//     const topOffset = (viewportHeight - cardHeight) / 2 - cardRect.top

//     if (this.animate) {
//       card.style.transform = `translate(${leftOffset}px, ${topOffset}px) `
//     } else {
//       card.style.transform = this.originalTransform
//     }
//   }

//   @HostListener('transitionend', ['$event'])
//   onTransitionEnd(event: TransitionEvent) {
//     const card = this.el.nativeElement
//     if (!this.animate) {
//       card.style.display = 'none'
//       card.style.transform = this.originalTransform
//     }
//   }

//   @HostListener('click', ['$event'])
//   onClick(event: MouseEvent) {
//     const card = this.el.nativeElement
//     const modal = document.getElementById('edit-modal')
//     const modalContent = document.getElementById('modal-content')
//     const cardRect = card.getBoundingClientRect()

//     // Store card position and size
//     this.cardPosition = {
//       top: cardRect.top,
//       left: cardRect.left,
//       width: cardRect.width,
//       height: cardRect.height
//     }

//     // Hide card
//     card.style.opacity = '0'

//     // Position and size modal over card
//     if(modal) modal.style.top = `${this.cardPosition.top}px`
//     if(modal) modal.style.left = `${this.cardPosition.left}px`
//     if(modalContent) modalContent.style.width = `${this.cardPosition.width}px`
//     if(modalContent) modalContent.style.height = `${this.cardPosition.height}px`

//     // Show modal
//     if(modal) modal.style.opacity = '1'

//     // Animate modal to center of screen
//     const viewportWidth = window.innerWidth
//     const viewportHeight = window.innerHeight
//     const leftOffset = (viewportWidth - this.cardPosition.width) / 2 - this.cardPosition.left
//     const topOffset = (viewportHeight - this.cardPosition.height) / 2 - this.cardPosition.top
//     if(modal) modal.style.transition = '0.3s'
//     if(modal) modal.style.transform = `translate(${leftOffset}px, ${topOffset}px)`
//   }

//   @HostListener('modalClose')
//   onModalClose() {
//     const card = this.el.nativeElement
//     const modal = document.getElementById('modal')
//     const modalContent = document.getElementById('modal-content')

//     // Animate modal back to card position and size
//     if(modal) modal.style.transition = '0.3s'
//     if(modal) modal.style.transform = `translate(${this.cardPosition?.left || 0}px, ${this.cardPosition?.top || 0}px)`

//     card.style.opacity = '1';

//   // Hide modal after the animation is complete
//     setTimeout(() => {
//       if (modal) {
//         modal.style.display = 'none';
//         modal.style.transform = 'none';
//         modal.style.opacity = '0';
//       }
//     }, 300);
//   }
// }
