import {Inject, Injectable} from '@angular/core';
import {EKIT_DTO_CONVERTER_TOKEN} from '../tokens/dto-converter.token';
import {EkitConverter} from '../models/converter.model';

export type Revert<T, C> = {
    [K in keyof C]: T[keyof T];
};

// todo: tests
@Injectable({
    providedIn: 'root',
})
export class EkitDtoConverterService {
    private reverseConverter: EkitConverter = {};
    private readonly converter: EkitConverter = {};

    constructor(
        @Inject(EKIT_DTO_CONVERTER_TOKEN)
        private readonly _converter: EkitConverter | null,
    ) {
        if (_converter) {
            this.converter = _converter;
            this.revertKeyValues(_converter);
        }
    }

    convertFromDto<T>(obj: T): Revert<T, EkitConverter> {
        const isArray = Array.isArray(obj);
        const newObj = isArray ? [] : {};

        Object.keys(obj).forEach(key => {
            const dtoKey = this.reverseConverter[key] || key;
            const value = obj[key];
            const frontValue =
                typeof value === 'object' && value !== null
                    ? this.convertFromDto(value)
                    : value;

            if (isArray) {
                (newObj as Array<T>).push(frontValue);
            } else {
                newObj[dtoKey] = frontValue;
            }
        });

        return newObj;
    }

    convertToDto<T>(obj: T): Revert<T, EkitConverter> {
        const isArray = Array.isArray(obj);
        const newObj = isArray ? [] : {};

        Object.keys(obj).forEach(key => {
            const dtoKey = this.converter[key] ? this.converter[key] : key;
            const originalValue = obj[key];
            const value =
                typeof originalValue === 'object' && originalValue !== null
                    ? this.convertToDto(originalValue)
                    : originalValue;

            if (isArray) {
                (newObj as Array<any>).push(value);
            } else {
                newObj[dtoKey] = value;
            }
        });

        return newObj;
    }

    private revertKeyValues(converter: EkitConverter) {
        Object.keys(converter).forEach(key => {
            this.reverseConverter[converter[key]] = key;
        });
    }
}
