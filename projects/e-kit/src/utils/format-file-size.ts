export function formatFileSize(size: number): string {
    if (!size || size < 10) {
        return '';
    }

    const strSize = size / 1024 / 1024;

    return strSize < 1 ? (strSize * 1024).toFixed(2) + 'Кб' : strSize.toFixed(2) + 'Мб';
}
