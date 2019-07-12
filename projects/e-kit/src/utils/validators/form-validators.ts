import {AbstractControl, FormGroup} from '@angular/forms';

const emailRegExp = /^[-\w]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const usernameRegExp = /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ0-9\-_+@.]{2,30}$/;
const passwordRegExp = /^(?=.*[A-zА-яёЁ])(?=.*[\d@.+\-])[A-zА-яёЁ\d@.+\-]{8,50}$/;

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
    return !!control.value
        ? null
        : {required: new EkitValidatorsError('Поле обязательно для заполнения')};
}

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string): any {
    return (group: FormGroup): {[key: string]: any} => {
        const password = group.controls[passwordKey];
        const confirmPassword = group.controls[confirmPasswordKey];
        const isMatching = password.value === confirmPassword.value;

        if (!isMatching) {
            confirmPassword.setErrors({mismatchedPasswords: 'Пароли не совпадают'});
        }

        return isMatching ? {} : {mismatchedPasswords: true};
    };
}
