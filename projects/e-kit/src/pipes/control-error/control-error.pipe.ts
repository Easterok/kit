import {Pipe, PipeTransform} from '@angular/core';
import {EkitValidatorsError} from '../../utils/validators';

@Pipe({
    name: 'controlError',
})
export class ControlErrorPipe implements PipeTransform {
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
