import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController,} from '@angular/common/http/testing';
import {WITH_CREDENTIALS_PROVIDER} from './with-credentials-interceptor';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
class TestService {
    constructor(private readonly http: HttpClient) {}

    get(): Observable<any> {
        return this.http.get('some-url');
    }
}

describe('WithCredentialsInterceptor', () => {
    let httpMock: HttpTestingController;
    let testService: TestService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WITH_CREDENTIALS_PROVIDER, TestService],
        });
    });

    beforeEach(() => {
        httpMock = TestBed.get(HttpTestingController);
        testService = TestBed.get(TestService);
    });

    it('Должен поставить WithCredentials', () => {
        testService.get().subscribe(resp => {
            expect(resp).toBeTruthy();
        });

        const httpRequest = httpMock.expectOne('some-url');
        const result = httpRequest.request.withCredentials;

        expect(result).toBe(true);
    });
});
