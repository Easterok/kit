import {AbstractControl, FormGroup} from '@angular/forms';

const emailRegExp = /^[-\w]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
const usernameRegExp = /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ0-9\-_+@.]{2,30}$/;
const passwordRegExp = /^(?=.*[A-zА-яёЁ])(?=.*[\d@.+\-])[A-zА-яёЁ\d@.+\-]{8,50}$/;

export function emailValidator(control: AbstractControl): any {
    return emailRegExp.test(control.value)
        ? {}
        : {
              email:
                  'Почта должна быть в правильном формате (к примеру exapmle@example.com)',
          };
}

export function usernameValidator(control: AbstractControl): any {
    return usernameRegExp.test(control.value)
        ? {}
        : {
              username:
                  'Имя пользователя должно начинаться с буквы и не содержать символы кроме @ - + _ .',
          };
}

export function passwordValidator(control: AbstractControl): any {
    return passwordRegExp.test(control.value)
        ? {}
        : {password: 'Пароль должен содержать цифры и буквы и символы @ - + _ .'};
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

export function getErrors(errors: {[key: string]: any}): string {
    if (!errors) {
        return;
    }

    if (errors['required']) {
        return 'Поле обязательно для заполнения';
    }

    if (errors['minlength']) {
        return `Минимальная длина — ${errors['minlength']['requiredLength']}`;
    }

    if (errors['maxlength']) {
        return `Максимальная длина — ${errors['maxlength']['requiredLength']}`;
    }

    if (errors['email']) {
        return errors['email'];
    }

    if (errors['username']) {
        return errors['username'];
    }

    if (errors['password']) {
        return errors['password'];
    }

    if (errors['mismatchedPasswords']) {
        return 'Пароли не совпадают';
    }

    if (errors['type']) {
        return errors['type'];
    }

    if (errors['min']) {
        return `Минимальное число - ${errors['min']['min']}`;
    }

    if (errors['max']) {
        return `Максимальное число - ${errors['max']['max']}`;
    }

    if (errors['file']) {
        return 'Неверный формат данных в файле';
    }
}
