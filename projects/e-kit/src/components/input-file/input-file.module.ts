import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EkitInputFileComponent} from './input-file.component';
import {MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
    declarations: [EkitInputFileComponent],
    imports: [CommonModule, MatIconModule, MatTooltipModule],
    exports: [EkitInputFileComponent],
})
export class EkitInputFileModule {}
