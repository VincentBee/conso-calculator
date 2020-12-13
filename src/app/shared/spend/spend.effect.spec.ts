import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ReplaySubject, Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { RANDOM_ID, SpendEffects } from './spend.effect';
import { list, listSuccess } from './spend.action';
import { SpendCategory, SpendFrequency } from './spend.model';

describe('Spend effects', () => {
    let effects: SpendEffects;
    let actions$: Observable<Action>;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            providers: [
                SpendEffects,
                { provide: RANDOM_ID, useFactory: () => () => 999 },
                provideMockActions(() => actions$),
                provideMockStore({
                    initialState: {},
                })
            ],
        });

        actions$ = new ReplaySubject(1);
        effects = TestBed.inject(SpendEffects);
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('Should load a fake list of spend.', () => {

        // GIVEN
        spyOn<any>(effects, 'randomId').and.returnValue(999);
        const action = list();

        testScheduler.run(({ hot, expectObservable }) => {

            // WHEN
            actions$ = hot('a', { a: action });

            // THEN
            expectObservable(effects.list$).toBe('b', {
                b: listSuccess({
                    payload: [
                        { id: 999, name: 'electricité', amount: 30, frequency: SpendFrequency.MONTHLY, category: SpendCategory.GAS_ELECTRICITY },
                        { id: 999, name: 'internet', amount: 15, frequency: SpendFrequency.MONTHLY },
                        { id: 999, name: 'assurance habitation', amount: 500, frequency: SpendFrequency.YEARLY, category: SpendCategory.HOUSE_INSURANCE },
                    ]
                })
            });
        });
    });
});
