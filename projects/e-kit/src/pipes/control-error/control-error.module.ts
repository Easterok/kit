import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EkitControlErrorPipe} from './control-error.pipe';

@NgModule({
    declarations: [EkitControlErrorPipe],
    imports: [CommonModule],
    exports: [EkitControlErrorPipe],
})
export class EkitControlErrorModule {}
