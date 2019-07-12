import {Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs';

export class WithCredentialsInterceptor implements HttpInterceptor {
    intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        return next.handle(req.clone({withCredentials: true}));
    }
}

export const WITH_CREDENTIALS_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: WithCredentialsInterceptor,
    multi: true,
};
