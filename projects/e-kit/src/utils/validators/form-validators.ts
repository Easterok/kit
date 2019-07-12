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

// todo: tests
export function requiredValidator(
    control: AbstractControl,
): {required: EkitValidatorsError} | null {
    return !!control.value
        ? null
        : {required: new EkitValidatorsError('Поле обязательно для заполнения')};
}

// todo: tests
export function minLengthValidator(length: number): EkitValidatorFn {
    return (control: AbstractControl): {minLength: EkitValidatorsError} | null => {
        return control.value && control.value.length > length
            ? null
            : {
                  minLength: new EkitValidatorsError(`Минимальная длина — ${length}`),
              };
    };
}

// todo: tests
export function maxLengthValidator(length: number): EkitValidatorFn {
    return (control: AbstractControl): {maxLength: EkitValidatorsError} | null => {
        return control.value && control.value.length <= length
            ? null
            : {
                  maxLength: new EkitValidatorsError(`Максимальная длина — ${length}`),
              };
    };
}

// todo: tests
export function minValidator(min: number): EkitValidatorFn {
    return (control: AbstractControl): {min: EkitValidatorsError} | null => {
        return control.value > min
            ? null
            : {
                  min: new EkitValidatorsError(`Минимальное значение - ${min}`),
              };
    };
}

// todo: tests
export function maxValidator(max: number): EkitValidatorFn {
    return (control: AbstractControl): {max: EkitValidatorsError} | null => {
        return control.value <= max
            ? null
            : {
                  max: new EkitValidatorsError(`Максимальное значение - ${max}`),
              };
    };
}

// todo: tests
export function matchingPasswords(
    passwordKey: string,
    confirmPasswordKey: string,
): EkitValidatorFn {
    const passwordMatchingError = {
        mismatchedPasswords: new EkitValidatorsError('Пароли не совпадают'),
    };

    return (group: FormGroup): {mismatchedPasswords: EkitValidatorsError} | null => {
        const password = group.controls[passwordKey];
        const confirmPassword = group.controls[confirmPasswordKey];
        const isMatching = password.value === confirmPassword.value;

        if (isMatching) {
            return null;
        }

        confirmPassword.setErrors(passwordMatchingError);

        return passwordMatchingError;
    };
}
