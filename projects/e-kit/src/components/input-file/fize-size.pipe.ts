import {Pipe, PipeTransform} from '@angular/core';
import {formatFileSize} from '../../utils/format-file-size';

@Pipe({
    name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
    transform(size: number): string {
        return formatFileSize(size);
    }
}
