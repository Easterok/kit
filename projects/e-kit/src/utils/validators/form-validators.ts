import {AbstractControl, FormGroup} from '@angular/forms';

const emailRegExp = /^[-\w]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const usernameRegExp = /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ0-9\-_+@.]{2,30}$/;
const passwordRegExp = /^(?=.*[A-zА-яёЁ])(?=.*[\d@.+\-])[A-zА-яёЁ\d@.+\-]{8,50}$/;

type EkitValidatorFn = (
    control: AbstractControl | FormGroup,
) => {[key: string]: EkitValidatorsError} | null;

export class EkitValidatorsError {
    constructor(private readonly message: string) {}

    toString(): string {
        return this.message;
    }
}

export function emailValidator(
    control: AbstractControl,
): {email: EkitValidatorsError} | null {
    return emailRegExp.test(control.value)
        ? null
        : {
              email: new EkitValidatorsError(
                  'Почта должна быть в правильном формате (к примеру exapmle@example.com)',
              ),
          };
}

export function usernameValidator(
    control: AbstractControl,
): {username: EkitValidatorsError} | null {
    return usernameRegExp.test(control.value)
        ? null
        : {
              username: new EkitValidatorsError(
                  'Имя пользователя должно начинаться с буквы и не содержать символы кроме @ - + _ .',
              ),
          };
}

export function passwordValidator(
    control: AbstractControl,
): {password: EkitValidatorsError} | null {
    return passwordRegExp.test(control.value)
        ? null
        : {
              password: new EkitValidatorsError(
                  'Пароль должен содержать цифры и буквы и символы @ - + _ .',
              ),
          };
}

export function requiredValidator(
    control: AbstractControl,
): {required: EkitValidatorsError} | null {
    const value = control.value;

    return (Array.isArray(value)
      ? value.length !== 0
      : !!value)
        ? null
        : {required: new EkitValidatorsError('Поле обязательно для заполнения')};
}

export function minLengthValidator(length: number): EkitValidatorFn {
    return (control: AbstractControl): {minLength: EkitValidatorsError} | null => {
        return control.value && control.value.length >= length
            ? null
            : {
                  minLength: new EkitValidatorsError(`Минимальная длина — ${length}`),
              };
    };
}

export function maxLengthValidator(length: number): EkitValidatorFn {
    return (control: AbstractControl): {maxLength: EkitValidatorsError} | null => {
        return control.value && control.value.length <= length
            ? null
            : {
                  maxLength: new EkitValidatorsError(`Максимальная длина — ${length}`),
              };
    };
}

export function minValidator(min: number): EkitValidatorFn {
    return (control: AbstractControl): {min: EkitValidatorsError} | null => {
        return control.value >= min
            ? null
            : {
                  min: new EkitValidatorsError(`Минимальное значение - ${min}`),
              };
    };
}

export function maxValidator(max: number): EkitValidatorFn {
    return (control: AbstractControl): {max: EkitValidatorsError} | null => {
        return control.value <= max
            ? null
            : {
                  max: new EkitValidatorsError(`Максимальное значение - ${max}`),
              };
    };
}

const MISMATCHED_KEY = 'mismatched';

export function matchingControls(
    message: string,
    ...controls: string[]
): EkitValidatorFn {
    const matchingError = {
        [MISMATCHED_KEY]: new EkitValidatorsError(message),
    };

    if (controls.length <= 1) {
        throw new Error('must be greater than 2 controls');
    }

    return (group: FormGroup): {mismatched: EkitValidatorsError} | null => {
        const first = group.controls[controls[0]];
        const next = controls.slice(1);
        const isMatching = next.every(key => {
            const control = group.controls[key];

            // todo: fix this
            return control.value === first.value;
        });

        if (isMatching) {
            controls.forEach(control => {
                const errors = group.controls[control].errors;

                if (!errors) {
                    return;
                }

                if (Object.keys(errors).length === 1) {
                    group.controls[control].setErrors(null);

                    return;
                }

                if (Object.keys(errors).length !== 1) {
                    delete group.controls[control].errors[MISMATCHED_KEY];

                    return;
                }
            });

            return null;
        }

        controls.forEach(control => {
            group.controls[control].setErrors(matchingError);
        });

        return matchingError;
    };
}
