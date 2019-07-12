import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule, MatTooltipModule} from '@angular/material';
import {EkitInputFileComponent} from './input-file.component';
import {FileSizePipe} from './fize-size.pipe';
import {EkitLetModule} from '../../directives';

const MAT_MODULES = [MatIconModule, MatTooltipModule];

@NgModule({
    declarations: [EkitInputFileComponent, FileSizePipe],
    imports: [CommonModule, EkitLetModule, MAT_MODULES],
    exports: [EkitInputFileComponent],
})
export class EkitInputFileModule {}
