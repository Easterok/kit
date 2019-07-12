import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlErrorPipe} from './control-error.pipe';

@NgModule({
    declarations: [ControlErrorPipe],
    imports: [CommonModule],
    exports: [ControlErrorPipe],
})
export class ControlErrorModule {}
