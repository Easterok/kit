import {emailValidator, passwordValidator, usernameValidator} from '../form-validators';
import {FormControl} from '@angular/forms';

describe('formValidators', () => {
    describe('email validator', () => {
        it('Если контрол пустой - error', () => {
            const control = new FormControl('');
            const {email} = emailValidator(control);

            expect(email).not.toBeUndefined();
        });

        it('Если в контроле корректная почта, но лишние символы - error', () => {
            const control = new FormControl('!@#email@email.ru');
            const {email} = emailValidator(control);

            expect(email).not.toBeUndefined();
        });

        it('Если в контроле между букв пробел - error', () => {
            const control = new FormControl('email @google.com');
            const {email} = emailValidator(control);

            expect(email).not.toBeUndefined();
        });

        it('Если домен больше 4 символов - error', () => {
            const control = new FormControl('email@email.rurus');
            const {email} = emailValidator(control);

            expect(email).not.toBeUndefined();
        });

        it('Если домен меньше 4 символов - error', () => {
            const control = new FormControl('email@email.rurus');
            const {email} = emailValidator(control);

            expect(email).not.toBeUndefined();
        });

        it('Если в контроле корректная почта - undefined', () => {
            const control = new FormControl('email@email.ru');
            const {email} = emailValidator(control);

            expect(email).toBeUndefined();
        });
    });

    describe('username validator', () => {
        it('Если в контроле пустое значение - ошибка', () => {
            const control = new FormControl('');
            const {username} = usernameValidator(control);

            expect(username).not.toBeUndefined();
        });

        it('Если значение начинается не на букву или цифру - ошибка', () => {
            const control = new FormControl('!2q');
            const {username} = usernameValidator(control);

            expect(username).not.toBeUndefined();
        });

        it('Если значение длинной больше 20 - ошибка', () => {
            const control = new FormControl('123456789012345678901');
            const {username} = usernameValidator(control);

            expect(username).not.toBeUndefined();
        });

        it('Если в контроле не разрешенные символы - ошибка', () => {
            const control = new FormControl('q^%$');
            const {username} = usernameValidator(control);

            expect(username).not.toBeUndefined();
        });

        it('Если в контроле между букв пробел - ошибка', () => {
            const control = new FormControl('qwe qwe');
            const {username} = usernameValidator(control);

            expect(username).not.toBeUndefined();
        });

        it('Если в контроле в конце букв пробел - ошибка', () => {
            const control = new FormControl('qweqwe ');
            const {username} = usernameValidator(control);

            expect(username).not.toBeUndefined();
        });

        it('Если в контроле разрешенные символы - undefined', () => {
            const control = new FormControl('username12345@_+.');
            const {username} = usernameValidator(control);

            expect(username).toBeUndefined();
        });
    });

    describe('passwordValidator', () => {
        it('Если контрол пустой - ошибка', () => {
            const control = new FormControl('');
            const {password} = passwordValidator(control);

            expect(password).not.toBeUndefined();
        });

        it('Если пароль меньше 8 символов - ошибка', () => {
            const control = new FormControl('qwer123');
            const {password} = passwordValidator(control);

            expect(password).not.toBeUndefined();
        });

        it('Если пароль только из букв - ошибка', () => {
            const control = new FormControl('qwertqwert');
            const {password} = passwordValidator(control);

            expect(password).not.toBeUndefined();
        });

        it('Если пароль только из цифр - ошибка', () => {
            const control = new FormControl('12345678');
            const {password} = passwordValidator(control);

            expect(password).not.toBeUndefined();
        });

        it('Если пароль содержит не разрешенные символы - ошибка', () => {
            const control = new FormControl('qwertqwert123@$%^');
            const {password} = passwordValidator(control);

            expect(password).not.toBeUndefined();
        });

        it('Если пароль содержит в конце пробел - ошибка', () => {
            const control = new FormControl('qwertqwert123 ');
            const {password} = passwordValidator(control);

            expect(password).not.toBeUndefined();
        });

        it('Если пароль содержит между букв пробел - ошибка', () => {
            const control = new FormControl('qwertqw ert123');
            const {password} = passwordValidator(control);

            expect(password).not.toBeUndefined();
        });

        it('Если пароль содержит букв и разрешенные символы - undefined', () => {
            const control = new FormControl('qwertqwert@_+.');
            const {password} = passwordValidator(control);

            expect(password).toBeUndefined();
        });

        it('Если пароль из букв и цифр - undefined', () => {
            const control = new FormControl('qwertqwert123');
            const {password} = passwordValidator(control);

            expect(password).toBeUndefined();
        });

        it('Если пароль из букв и цифр и символов - undefined', () => {
            const control = new FormControl('qwertqwert123@.+');
            const {password} = passwordValidator(control);

            expect(password).toBeUndefined();
        });

        it('Если пароль из букв (с заглавными русскими) и цифр и символов - undefined', () => {
            const control = new FormControl('qwertqwertАААяяя123');
            const {password} = passwordValidator(control);

            expect(password).toBeUndefined();
        });

        it('Если пароль из букв (с заглавными английскими) и цифр и символов - undefined', () => {
            const control = new FormControl('qwertqwertAZSW123');
            const {password} = passwordValidator(control);

            expect(password).toBeUndefined();
        });

        it('Если пароль из букв (и русские и английские) и цифр и символов - undefined', () => {
            const control = new FormControl('qwertqwertAZSWАяФЫВЯЗЩШГН123');
            const {password} = passwordValidator(control);

            expect(password).toBeUndefined();
        });
    });
});
