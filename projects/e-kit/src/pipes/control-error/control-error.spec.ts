import {EkitControlErrorPipe} from './control-error.pipe';
import {EkitValidatorsError} from '../../utils/validators';

describe('ControlErrorPipe', () => {
    let pipe: EkitControlErrorPipe;

    beforeEach(() => {
        pipe = new EkitControlErrorPipe();
    });

    it('Если ошибок нет, то возвращает null', () => {
        const errors = null;

        const result = pipe.transform(errors);

        expect(result).toBeNull();
    });

    it('Если пустой объект, то возвращает null', () => {
        const errors = {};

        const result = pipe.transform(errors);

        expect(result).toBeNull();
    });

    it('Если ошибки есть, то возвращает первую ошибку', () => {
        const errors = {
            2: new EkitValidatorsError('second'),
            1: new EkitValidatorsError('first'),
        };

        const result = pipe.transform(errors);

        expect(result).toEqual(errors['1']);
    });
});
