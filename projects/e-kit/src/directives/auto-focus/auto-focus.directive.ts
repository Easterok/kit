import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[ekitAutoFocus]',
})
export class EkitAutoFocusDirective implements AfterViewInit {
    constructor(private readonly elementRef: ElementRef) {}

    ngAfterViewInit() {
        setTimeout(() => this.elementRef.nativeElement.focus());
    }
}
