import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    Input,
    Provider,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {formatFileSize} from '../../utils/format-file-size';
import {EkitValidatorsError} from '../../utils/validators';

const noop = () => {};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EkitInputFileComponent),
    multi: true,
};

const CUSTOM_INPUT_VALIDATOR: Provider = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EkitInputFileComponent),
    multi: true,
};

const ATTACH_FILE_ERROR = {attachFile: new EkitValidatorsError('Неверный формат файла')};

@Component({
    selector: 'ekit-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_VALIDATOR],
})
export class EkitInputFileComponent implements ControlValueAccessor, Validator {
    @Input() allowFileTypes: string[] = [];

    @Input() specialFileFormats: string[] = [];

    @Input() maxSize = 10 * 1024 * 1024;

    @Input() tooltipInfo: string;

    @ViewChild('nativeInput', {read: ElementRef, static: true})
    private readonly nativeInput: ElementRef;

    readonly files$ = new BehaviorSubject<any>([]);
    readonly error$ = new BehaviorSubject<string | null>(null);

    private innerValue: FileList | File | null;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: FileList | File | null) => void = noop;

    get hasError(): boolean {
        return this.error$.value !== null;
    }

    get value(): FileList | File | null {
        return this.innerValue;
    }

    set value(v: FileList | File | null) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    validate(control: FormControl): {attachFile: EkitValidatorsError} | null {
        return !this.hasError ? null : ATTACH_FILE_ERROR;
    }

    writeValue(value: FileList | null) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.files$.next(value ? [value] : []);
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    changeFile(event: Event) {
        const file = (<any>event.target).files[0];

        if (!file) {
            return;
        }

        this.files$.next([file]);
        this.error$.next(null);

        const size = file.size / 1024 / 1024;

        if (size > this.maxSize) {
            this.error$.next(
                `Максимальный размер файла - ${formatFileSize(this.maxSize)}`,
            );

            return;
        }

        if (!file.type) {
            this.checkOnSpecialFileFormats(file);
        }

        if (file.type && this.allowFileTypes.length !== 0) {
            this.checkOnAllowedFileTypes(file);
        }

        if (!this.hasError) {
            this.value = file;
        }
    }

    removeFile() {
        this.value = null;
        this.files$.next([]);
        this.error$.next(null);
        this.nativeInput.nativeElement.value = '';
    }

    private checkOnSpecialFileFormats(file: File) {
        const [_, type] = file.name.split('.');

        const hasError = !this.specialFileFormats.includes(type);

        if (hasError) {
            this.error$.next(this.getErrorMessage());
        }
    }

    private checkOnAllowedFileTypes(file: File) {
        const hasError = !this.allowFileTypes.includes(file.type);

        if (hasError) {
            this.error$.next(this.getErrorMessage());
        }
    }

    private getErrorMessage(): string {
        const JOINED_STR = ', .';
        const ALLOWED = 'Разрешенные типы файла - ';

        if (this.specialFileFormats.length !== 0) {
            const message = '.' + this.specialFileFormats.join(JOINED_STR);

            return ALLOWED + message;
        }

        if (this.allowFileTypes.length !== 0) {
            const allowedTypes = this.allowFileTypes.map(type => type.split('/')[1]);

            return ALLOWED + '.' + allowedTypes.join(JOINED_STR);
        }

        return 'Неверный формат файла';
    }
}
