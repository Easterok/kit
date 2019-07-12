import {Subject} from 'rxjs';
import {takeUntilDestroy} from './take-until-destroy';

type SpyObserver = {next: jasmine.Spy; error: jasmine.Spy; complete: jasmine.Spy};

class Test {
    subject = new Subject<any>();

    onDestroyCalls = 0;

    ngOnDestroy() {
        this.onDestroyCalls += 1;
    }

    subscribe(spy: SpyObserver) {
        this.subject
            .asObservable()
            .pipe(takeUntilDestroy(this))
            .subscribe(spy);
    }
}

function createSpyObserver(): SpyObserver {
    return {
        next: jasmine.createSpy(),
        error: jasmine.createSpy(),
        complete: jasmine.createSpy(),
    };
}

describe('TakeUntilDestroy', () => {
    it('Не мутирует значения', () => {
        const spy = createSpyObserver();
        const component = new Test();
        const value = 123;

        component.subscribe(spy);

        component.subject.next(value);

        expect(spy.next).toHaveBeenCalledWith(value);
    });

    it('Не вызывает ошибок', () => {
        const spy = createSpyObserver();
        const component = new Test();

        component.subscribe(spy);

        component.subject.next(123);

        expect(spy.error).not.toHaveBeenCalled();
    });

    it('Если вызывается ngOnDestroy, то отписывается', () => {
        const spy = createSpyObserver();
        const component = new Test();

        component.subscribe(spy);

        component.subject.next(123);
        component.ngOnDestroy();

        expect(spy.complete).toHaveBeenCalledTimes(1);
    });

    it('Если несколько подписок, то отписывается от всех', () => {
        const spy1 = createSpyObserver();
        const spy2 = createSpyObserver();
        const component = new Test();

        component.subscribe(spy1);
        component.subscribe(spy2);

        component.ngOnDestroy();

        expect(spy1.complete).toHaveBeenCalledTimes(1);
        expect(spy2.complete).toHaveBeenCalledTimes(1);
    });

    it('Вызывает оригинальный ngOnDestroy', () => {
        const spy = createSpyObserver();
        const component = new Test();

        component.subscribe(spy);

        component.ngOnDestroy();

        expect(spy.complete).toHaveBeenCalledTimes(1);
        expect(component.onDestroyCalls).toBe(1);
    });

    it('Если поток закончился до того, как сработал ngOnDestroy, то он отписался', () => {
        const spy = createSpyObserver();
        const component = new Test();

        component.subscribe(spy);

        component.subject.complete();

        expect(spy.complete).toHaveBeenCalledTimes(1);
    });
});
