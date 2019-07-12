import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputFileComponent} from './input-file.component';
import {MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
    declarations: [InputFileComponent],
    imports: [CommonModule, MatIconModule, MatTooltipModule],
    exports: [InputFileComponent],
})
export class InputFileModule {}
