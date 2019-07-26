import {InjectionToken} from '@angular/core';
import {EkitConverter} from '../models/converter.model';

export const EKIT_DTO_CONVERTER_TOKEN = new InjectionToken<EkitConverter>(
    'Ekit Dto Converter Token',
);
