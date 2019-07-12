import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EkitLetDirective} from './let.directive';

@NgModule({
    declarations: [EkitLetDirective],
    imports: [CommonModule],
    exports: [EkitLetDirective],
})
export class EkitLetModule {}
