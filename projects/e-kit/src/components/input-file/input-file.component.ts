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

@Component({
    selector: 'ekit-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CUSTOM_INPUT_VALIDATOR],
})
export class EkitInputFileComponent implements ControlValueAccessor, Validator {
    @Input() allowTypeFile = [];

    @Input() maxSize = 10;

    @Input() tooltipInfo: string;

    @ViewChild('nativeInput', {static: true, read: ElementRef}) nativeInput: ElementRef;

    error = false;

    readonly error$ = new BehaviorSubject<string>(null);

    type: string;

    readonly files$ = new BehaviorSubject<any>([]);

    private innerValue: any;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: FileList) => void = noop;

    get value(): FileList {
        return this.innerValue;
    }

    set value(v: FileList) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    validate(control: FormControl): {attachFileError: {valid: boolean}} | null {
        return !this.error
            ? null
            : {
                  attachFileError: {
                      valid: false,
                  },
              };
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
        this.error = false;
        this.error$.next('');

        const size = file.size / 1024 / 1024;

        if (size > this.maxSize) {
            this.error = true;
            this.error$.next(`Максимальный размер файла - ${this.maxSize} Mb`);

            return;
        }

        // // todo: file type error
        // if (
        //     (!this.allowTypeFile.length && !this.isLetFile(file)) ||
        //     (this.allowTypeFile.length && this.allowTypeFile.indexOf(file.type) < 0)
        // ) {
        //     this.error = true;
        //
        //     const [_, type] = this.allowTypeFile.map(typeFile => typeFile.split('/'));
        //     const message = type ? '.' + type[0] + '.' + type[1] : '.let';
        //
        //     this.error$.next(`Разрешенные типы файла - ${message}`);
        //
        //     return;
        // }

        this.value = file;
    }

    removeFile() {
        // todo: filter current file
        this.value = null;
        this.files$.next([]);
        this.error$.next('');
        this.nativeInput.nativeElement.value = '';
        this.error = true;
    }

    getSize(size: number): string {
        if (size < 10) {
            return '';
        }

        const strSize = size / 1024 / 1024;

        return strSize < 1
            ? (strSize * 1024).toFixed(2) + 'Kb'
            : strSize.toFixed(2) + 'Mb';
    }

    private isLetFile({name}: File): boolean {
        const dotIndex = name.lastIndexOf('.');

        return name.slice(dotIndex + 1) === 'let';
    }
}
