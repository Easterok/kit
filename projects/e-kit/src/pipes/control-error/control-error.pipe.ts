import {Pipe, PipeTransform} from '@angular/core';
import {EkitValidatorsError} from '../../utils/validators';

@Pipe({
    name: 'ekitControlError',
})
export class EkitControlErrorPipe implements PipeTransform {
    transform(
        errors: {[key: string]: EkitValidatorsError} | null,
    ): EkitValidatorsError | null {
        if (!errors) {
            return null;
        }

        const error = Object.keys(errors)[0];

        return errors[error];
    }
}
