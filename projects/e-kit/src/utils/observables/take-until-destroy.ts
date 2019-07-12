import {Observable, pipe, Subject, UnaryFunction} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const ON_DESTROY = 'ngOnDestroy';
const TAKE_UNTIL_DESTROY = '__EkitTakeUntilOnDestroySubject';

export function takeUntilDestroy<K, T>(
    instance: T,
): UnaryFunction<Observable<K>, Observable<K>> {
    const originalOnDestroy = instance[ON_DESTROY];

    if (!originalOnDestroy) {
        throw new Error('implements OnDestroy');
    }

    const subjectInComponent = instance[TAKE_UNTIL_DESTROY];

    if (!subjectInComponent) {
        const subject$ = new Subject<void>();

        instance[TAKE_UNTIL_DESTROY] = subject$;

        instance[ON_DESTROY] = (...args: any[]) => {
            originalOnDestroy.apply(instance, args);
            subject$.next();
            subject$.complete();
        };

        return pipe(takeUntil(subject$));
    }

    return pipe(takeUntil(subjectInComponent));
}
