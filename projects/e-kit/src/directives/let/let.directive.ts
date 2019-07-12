import {Directive, Inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';

class EkitLetContext<T> {
    constructor(private readonly instance: EkitLetDirective<T>) {}

    get $implicit(): T {
        return this.instance.ekitLet;
    }

    get ekitLet(): T {
        return this.instance.ekitLet;
    }
}

@Directive({
    selector: '[ekitLet]',
})
export class EkitLetDirective<T> {
    @Input() ekitLet: T;

    constructor(
        @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
        @Inject(TemplateRef) templateRef: TemplateRef<EkitLetContext<T>>,
    ) {
        viewContainer.createEmbeddedView(templateRef, new EkitLetContext(this));
    }
}
