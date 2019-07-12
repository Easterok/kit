import {roundTo} from '../round-to';

describe('roundTo', () => {
    it('Если значение целое, то не изменяется', () => {
        const value = 5;

        const result = roundTo(value, 2);

        expect(result).toBe(5);
    });

    it('Если значение не целое, то откругляется правильно', () => {
        const value = 5 * (1 / 3);

        const result = roundTo(value, 3);

        expect(result).toBe(1.667);
    });
});
