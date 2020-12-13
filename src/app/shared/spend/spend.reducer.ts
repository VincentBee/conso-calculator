import { Action, createReducer, on } from '@ngrx/store';
import { Spend } from './spend.model';
import * as SpendActions from './spend.action';

export interface SpendState {
    list: Spend[],
    loading: boolean,
}

const initialState: SpendState = {
    list: [],
    loading: false,
};

const _spendReducer = createReducer(
    initialState,

    on(SpendActions.list, (state) => ({
        ...state,
        loading: true,
    })),
    on(SpendActions.listSuccess, (state, action) => ({
        ...state,
        loading: false,
        list: action.payload,
    })),
    on(SpendActions.listFail, (state) => ({
        ...state,
        loading: false,
    })),

    on(SpendActions.add, (state) => ({
        ...state,
        loading: true,
    })),
    on(SpendActions.addSuccess, (state, action) => ({
        ...state,
        loading: false,
        list: [
            ...state.list,
            action.payload,
        ]
    })),
    on(SpendActions.addFail, (state) => ({
        ...state,
        loading: false,
    })),

    on(SpendActions.remove, (state) => ({
        ...state,
        loading: true,
    })),
    on(SpendActions.removeSuccess, (state, action) => ({
        ...state,
        loading: false,
        list: state.list.filter(item => item.id !== action.previous.payload.id),
    })),
    on(SpendActions.removeFail, (state) => ({
        ...state,
        loading: false,
    })),
);

export function spendReducer(state: SpendState | undefined, action: Action) {
    return _spendReducer(state, action);
}
