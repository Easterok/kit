import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EkitAutoFocusDirective} from './auto-focus.directive';

@NgModule({
    declarations: [EkitAutoFocusDirective],
    imports: [CommonModule],
    exports: [EkitAutoFocusDirective],
})
export class EkitAutoFocusModule {}
