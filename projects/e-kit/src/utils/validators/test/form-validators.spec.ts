import {FormControl, FormGroup} from '@angular/forms';
import {
    EkitValidatorsError,
    emailValidator,
    matchingControls,
    maxLengthValidator,
    maxValidator,
    minLengthValidator,
    minValidator,
    passwordValidator,
    requiredValidator,
    usernameValidator,
} from '../form-validators';

describe('formValidators', () => {
    describe('email validator', () => {
        it('Если контрол пустой - result', () => {
            const control = new FormControl('');
            const {email} = emailValidator(control);

            expect(email).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если в контроле корректная почта, но лишние символы - result', () => {
            const control = new FormControl('!@#email@email.ru');
            const {email} = emailValidator(control);

            expect(email).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если в контроле между букв пробел - result', () => {
            const control = new FormControl('email @google.com');
            const {email} = emailValidator(control);

            expect(email).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если домен больше 4 символов - result', () => {
            const control = new FormControl('email@email.rurus');
            const {email} = emailValidator(control);

            expect(email).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если домен меньше 4 символов - result', () => {
            const control = new FormControl('email@email.rurus');
            const {email} = emailValidator(control);

            expect(email).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если в контроле корректная почта - null', () => {
            const control = new FormControl('email@email.ru');
            const result = emailValidator(control);

            expect(result).toBeNull();
        });
    });

    describe('username validator', () => {
        it('Если в контроле пустое значение - ошибка', () => {
            const control = new FormControl('');
            const {username} = usernameValidator(control);

            expect(username).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если значение начинается не на букву или цифру - ошибка', () => {
            const control = new FormControl('!2q');
            const {username} = usernameValidator(control);

            expect(username).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если значение длинной больше 20 - ошибка', () => {
            const control = new FormControl('123456789012345678901');
            const {username} = usernameValidator(control);

            expect(username).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если в контроле не разрешенные символы - ошибка', () => {
            const control = new FormControl('q^%$');
            const {username} = usernameValidator(control);

            expect(username).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если в контроле между букв пробел - ошибка', () => {
            const control = new FormControl('qwe qwe');
            const {username} = usernameValidator(control);

            expect(username).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если в контроле в конце букв пробел - ошибка', () => {
            const control = new FormControl('qweqwe ');
            const {username} = usernameValidator(control);

            expect(username).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если в контроле разрешенные символы - null', () => {
            const control = new FormControl('username12345@_+.');
            const result = usernameValidator(control);

            expect(result).toBeNull();
        });
    });

    describe('passwordValidator', () => {
        it('Если контрол пустой - ошибка', () => {
            const control = new FormControl('');
            const {password} = passwordValidator(control);

            expect(password).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если пароль меньше 8 символов - ошибка', () => {
            const control = new FormControl('qwer123');
            const {password} = passwordValidator(control);

            expect(password).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если пароль только из букв - ошибка', () => {
            const control = new FormControl('qwertqwert');
            const {password} = passwordValidator(control);

            expect(password).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если пароль только из цифр - ошибка', () => {
            const control = new FormControl('12345678');
            const {password} = passwordValidator(control);

            expect(password).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если пароль содержит не разрешенные символы - ошибка', () => {
            const control = new FormControl('qwertqwert123@$%^');
            const {password} = passwordValidator(control);

            expect(password).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если пароль содержит в конце пробел - ошибка', () => {
            const control = new FormControl('qwertqwert123 ');
            const {password} = passwordValidator(control);

            expect(password).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если пароль содержит между букв пробел - ошибка', () => {
            const control = new FormControl('qwertqw ert123');
            const {password} = passwordValidator(control);

            expect(password).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если пароль содержит букв и разрешенные символы - null', () => {
            const control = new FormControl('qwertqwert@_+.');
            const result = passwordValidator(control);

            expect(result).toBeNull();
        });

        it('Если пароль из букв и цифр - null', () => {
            const control = new FormControl('qwertqwert123');
            const result = passwordValidator(control);

            expect(result).toBeNull();
        });

        it('Если пароль из букв и цифр и символов - null', () => {
            const control = new FormControl('qwertqwert123@.+');
            const result = passwordValidator(control);

            expect(result).toBeNull();
        });

        it('Если пароль из букв (с заглавными русскими) и цифр и символов - null', () => {
            const control = new FormControl('qwertqwertАААяяя123');
            const result = passwordValidator(control);

            expect(result).toBeNull();
        });

        it('Если пароль из букв (с заглавными английскими) и цифр и символов - null', () => {
            const control = new FormControl('qwertqwertAZSW123');
            const result = passwordValidator(control);

            expect(result).toBeNull();
        });

        it('Если пароль из букв (и русские и английские) и цифр и символов - null', () => {
            const control = new FormControl('qwertqwertAZSWАяФЫВЯЗЩШГН123');
            const result = passwordValidator(control);

            expect(result).toBeNull();
        });
    });

    describe('requiredValidator', () => {
        it('Если значение null, то ошибка', () => {
            const control = new FormControl(null);
            const {required} = requiredValidator(control);

            expect(required).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если значение пустая строка, то ошибка', () => {
            const control = new FormControl('');
            const {required} = requiredValidator(control);

            expect(required).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если значение пустой массив, то ошибка', () => {
            const control = new FormControl([]);
            const {required} = requiredValidator(control);

            expect(required).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если не пустой массив, то null', () => {
            const control = new FormControl(['q', 'w', 'e']);
            const result = requiredValidator(control);

            expect(result).toBeNull();
        });

        it('Если есть значение, то null', () => {
            const control = new FormControl('qwe');
            const result = requiredValidator(control);

            expect(result).toBeNull();
        });
    });

    describe('minLengthValidator', () => {
        it('Если длина строки меньше 20, то ошибка', () => {
            const control = new FormControl('qwer');
            const {minLength} = minLengthValidator(20)(control);

            expect(minLength).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если длина строки равна 20, то нет ошибки', () => {
            const control = new FormControl(new Array(20).fill(' ').join(''));
            const result = minLengthValidator(20)(control);

            expect(result).toBeNull();
        });

        it('Если длина строки больше 20, то нет ошибки', () => {
            const control = new FormControl(new Array(25).fill(' ').join(''));
            const result = minLengthValidator(25)(control);

            expect(result).toBeNull();
        });
    });

    describe('maxLengthValidator', () => {
        it('Если длина строки больше 20, то ошибка', () => {
            const control = new FormControl(new Array(25).fill(' ').join(''));

            const {maxLength} = maxLengthValidator(20)(control);

            expect(maxLength).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если длина строки равна 20, то ошибки нет', () => {
            const control = new FormControl(new Array(20).fill(' ').join(''));
            const result = maxLengthValidator(20)(control);

            expect(result).toBeNull();
        });

        it('Если длина строки меньше 20, то ошибки нет', () => {
            const control = new FormControl(new Array(10).fill(' ').join(''));
            const result = maxLengthValidator(20)(control);

            expect(result).toBeNull();
        });
    });

    describe('minValidator', () => {
        it('Если значение больше 20, то ошибки нет', () => {
            const control = new FormControl(25);
            const result = minValidator(20)(control);

            expect(result).toBeNull();
        });

        it('Если значение равно 20, то ошибки нет', () => {
            const control = new FormControl(20);
            const result = minValidator(20)(control);

            expect(result).toBeNull();
        });

        it('Если значение меньше 20, то ошибка', () => {
            const control = new FormControl(15);
            const {min} = minValidator(20)(control);

            expect(min).toEqual(jasmine.any(EkitValidatorsError));
        });
    });

    describe('maxValidator', () => {
        it('Если значение больше 20, то ошибка', () => {
            const control = new FormControl(25);
            const {max} = maxValidator(20)(control);

            expect(max).toEqual(jasmine.any(EkitValidatorsError));
        });

        it('Если значение равно 20, то ошибки нет', () => {
            const control = new FormControl(20);
            const result = maxValidator(20)(control);

            expect(result).toBeNull();
        });

        it('Если значение меньше 20, то ошибки нет', () => {
            const control = new FormControl(15);
            const result = maxValidator(20)(control);

            expect(result).toBeNull();
        });
    });

    describe('matchingControls', () => {
        it('Если значения не совпадают, то форма не валидна', () => {
            const form = new FormGroup(
                {
                    control1: new FormControl(),
                    control2: new FormControl(),
                },
                matchingControls('error', 'control1', 'control2'),
            );

            form.setValue({control1: 'asd', control2: 'qwe'});

            expect(form.invalid).toBeTruthy();
        });

        it('Если значения не совпадают, то во всех контролах ошибки', () => {
            const form = new FormGroup(
                {
                    control1: new FormControl(),
                    control2: new FormControl(),
                    control3: new FormControl(),
                },
                matchingControls('error', 'control1', 'control2', 'control3'),
            );

            form.patchValue({control1: 'asd', control2: 'qwe'});

            expect(form.get('control1').errors.mismatched).toEqual(
                jasmine.any(EkitValidatorsError),
            );
            expect(form.get('control2').errors.mismatched).toEqual(
                jasmine.any(EkitValidatorsError),
            );
            expect(form.get('control3').errors.mismatched).toEqual(
                jasmine.any(EkitValidatorsError),
            );
        });

        it('Если значения совпадают, то форма валидна', () => {
            const form = new FormGroup(
                {
                    control1: new FormControl(),
                    control2: new FormControl(),
                },
                matchingControls('error', 'control1', 'control2'),
            );

            form.setValue({control1: 'qwe', control2: 'qwe'});

            expect(form.valid).toBeTruthy();
        });
    });
});
