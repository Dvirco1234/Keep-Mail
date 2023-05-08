import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[responsiveColumns]',
})
export class ResponsiveColumnsDirective implements OnInit, OnDestroy {
  @Input('responsiveColumns') columnWidth: number = 240;
  private container: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.container = this.elementRef.nativeElement;

    // Create a ResizeObserver to track changes in container width
    this.resizeObserver = new ResizeObserver(entries => {
      console.log('entries: ', entries);
      for (const entry of entries) {
        console.log('entry: ', entry);
        const { width } = entry.contentRect;
        console.log('width: ', width);
        this.adjustColumns(width);
      }
    });

    // Observe the container element for width changes
    if (this.container) this.resizeObserver.observe(this.container);
  }

  ngOnDestroy(): void {
    // Stop observing and disconnect the ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private adjustColumns(containerWidth: number): void {
    const children = this.container?.children;
    const columnCount = Math.floor(containerWidth / this.columnWidth);

    // Set the width for each child element based on the number of columns
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        child.style.columnCount = `${columnCount}`;
      }
    }
  }

  // private adjustColumns(containerWidth: number): void {
  //   const columnCount = Math.floor(containerWidth / this.columnWidth);
  //   if (this.container) this.container.style.columnCount = `${columnCount}`;
  // }
}

