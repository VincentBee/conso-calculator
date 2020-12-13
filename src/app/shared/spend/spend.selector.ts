import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpendFrequency } from './spend.model';
import { SpendState } from './spend.reducer';

const selectFeatureState = createFeatureSelector<SpendState>('spend');

export const selectList = createSelector(selectFeatureState, (state) => state.list);

export const selectLoading = createSelector(selectFeatureState, (state) => state.loading);

export const selectLoadingList = createSelector(selectList, selectLoading, (list, loading) => ({
    list,
    loading
}));

export const selectTotalPerMonth = createSelector(selectList, (list) => list.reduce((accumulator, current) => {
    switch (current.frequency) {
        case SpendFrequency.DAILY:
            return accumulator + (current.amount * 365 / 12);
        case SpendFrequency.WEEKLY:
            return accumulator + (current.amount * 52 / 12);
        case SpendFrequency.MONTHLY:
            return accumulator + current.amount;
        case SpendFrequency.YEARLY:
            return accumulator + (current.amount / 12);
        default:
            return accumulator;
    }
}, 0));

export const selectTotalPerYear = createSelector(selectList, (list) => list.reduce((accumulator, current) => {
    switch (current.frequency) {
        case SpendFrequency.DAILY:
            return accumulator + (current.amount * 365);
        case SpendFrequency.WEEKLY:
            return accumulator + (current.amount * 52);
        case SpendFrequency.MONTHLY:
            return accumulator + (current.amount * 12);
        case SpendFrequency.YEARLY:
            return accumulator + current.amount;
        default:
            return accumulator;
    }
}, 0));
