import {formatFileSize} from '../format-file-size';

describe('formatFileSize', () => {
    it('Если размер файла меньше 10 байт, то пустая строка', () => {
        const size = 5;

        const result = formatFileSize(size);

        expect(result).toBe('');
    });

    it('Если размер файла меньше 1Мб, то размер указывается в Кб', () => {
        const size = 0.5 * 1024 * 1024;

        const result = formatFileSize(size);

        expect(result).toBe(`${0.5 * 1024} Кб`);
    });

    it('Размер файла округляется до сотых', () => {
        const size = 6317;

        const result = formatFileSize(size);

        expect(result).toBe('6.17 Кб');
    });

    it('Если размер файла больше 1Мб, то размер указывается в Мб', () => {
        const size = 2 * 1024 * 1024;

        const result = formatFileSize(size);

        expect(result).toBe('2 Мб');
    });
});
