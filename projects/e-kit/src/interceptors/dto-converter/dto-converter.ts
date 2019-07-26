import {Provider} from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EkitDtoConverterService} from '../../services/dto-converter.service';

// todo: tests
export class EkitDtoConverterInterceptor implements HttpInterceptor {
    constructor(private readonly dtoConverterService: EkitDtoConverterService) {}

    intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        let handle = next.handle(req);

        if (req.body) {
            handle = next.handle(
                req.clone({body: this.dtoConverterService.convertToDto(req.body)}),
            );
        }

        return handle.pipe(
            map(event => {
                if (event instanceof HttpResponse && event.body) {
                    event = event.clone({
                        body: this.dtoConverterService.convertFromDto(event.body),
                    });
                }

                return event;
            }),
        );
    }
}

export const EKIT_DTO_CONVERTER_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useValue: EkitDtoConverterInterceptor,
    multi: true,
};
