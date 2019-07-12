import {roundTo} from './round-to';

export function formatFileSize(size: number): string {
    if (!size || size < 10) {
        return '';
    }

    const strSize = size / 1024 / 1024;

    return strSize < 1 ? roundTo(strSize * 1024, 2) + ' Кб' : roundTo(strSize, 2) + ' Мб';
}
