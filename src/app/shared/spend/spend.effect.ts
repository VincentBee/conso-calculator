import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import * as SpendActions from './spend.action';
import { Spend, SpendCategory, SpendFrequency } from './spend.model';

export const RANDOM_ID = new InjectionToken<string>('randomId');

@Injectable()
export class SpendEffects {
    private MOCK_RESPONSE_LIST: Spend[] = [];

    constructor(
        private actions$: Actions,
        private router: Router,
        @Inject(RANDOM_ID) private randomId: () => number,
    ) {
        this.MOCK_RESPONSE_LIST = [
            { id: this.randomId(), name: 'electricité', amount: 30, frequency: SpendFrequency.MONTHLY, category: SpendCategory.GAS_ELECTRICITY },
            { id: this.randomId(), name: 'internet', amount: 15, frequency: SpendFrequency.MONTHLY },
            { id: this.randomId(), name: 'assurance habitation', amount: 500, frequency: SpendFrequency.YEARLY, category: SpendCategory.HOUSE_INSURANCE },
        ]
    }

    list$ = createEffect(() => this.actions$.pipe(
        ofType(SpendActions.list),
        mergeMap(() => {
            return of(this.MOCK_RESPONSE_LIST).pipe(
                map((response: any) => SpendActions.listSuccess({
                    payload: response as Spend[]
                })),
                catchError(() => of(SpendActions.listFail({
                    error: 'Error when recieving data from the server...',
                })))
            );
        }),
    ));

    add$ = createEffect(() => this.actions$.pipe(
        ofType(SpendActions.add),
        mergeMap((action) => {
            return of(action.payload).pipe(
                map((response) => SpendActions.addSuccess({
                    previous: action,
                    payload: {
                        ...response,
                        id: this.randomId(),
                    } as Spend,
                })),
                catchError(() => of(SpendActions.addFail({
                    previous: action,
                    error: 'Error when adding data to the server...',
                })))
            );
        }),
    ));

    remove$ = createEffect(() => this.actions$.pipe(
        ofType(SpendActions.remove),
        mergeMap((action) => {
            return of({}).pipe(
                map(() => SpendActions.removeSuccess({
                    previous: action,
                })),
                catchError(() => of(SpendActions.removeFail({
                    previous: action,
                    error: 'Error when remonvinig data to the server...',
                })))
            );
        }),
    ));

    addSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(SpendActions.add),
        tap(() => {
            this.router.navigate(['/'])
        })
    ), { dispatch: false });
}
