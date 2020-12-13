import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add, remove } from './spend.action';
import { Spend } from './spend.model';
import { selectLoadingList, selectTotalPerMonth, selectTotalPerYear } from './spend.selector';

@Injectable()
export class SpendService {

    public loadingList$: Observable<{ list: Spend[], loading: boolean}>;
    public totalPerMonth$: Observable<number>;
    public totalPerYear$: Observable<number>;

    constructor(
        private store: Store
    ) {
        this.loadingList$ = this.store.pipe(
            select(selectLoadingList),
        );
        this.totalPerMonth$ = this.store.pipe(select(selectTotalPerMonth));
        this.totalPerYear$ = this.store.pipe(select(selectTotalPerYear));
    }

    public create(spend: Spend): void {
        this.store.dispatch(add({
            payload: spend,
        }));
    }

    public remove(spend: Spend): void {
        this.store.dispatch(remove({
            payload: spend,
        }));
    }
}
